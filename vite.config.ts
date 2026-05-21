import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import type { Plugin } from 'vite'
import { createHash } from 'crypto'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.svg', '.gif', '.webp'])
const ICON_EXTS = new Set(['.png', '.svg', '.jpg', '.jpeg'])

function localAssetsPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'local-assets-api',
    configureServer(server) {
      // List local assets
      server.middlewares.use('/api/local-assets', (req, res) => {
        const url = new URL(req.url!, 'http://localhost')
        const type = url.searchParams.get('type') === 'icons' ? 'icons' : 'images'
        const dir = join(process.cwd(), 'public', type)
        const exts = type === 'icons' ? ICON_EXTS : IMAGE_EXTS

        try {
          const files = existsSync(dir)
            ? readdirSync(dir)
                .filter(f => !f.startsWith('.') && exts.has(extname(f).toLowerCase()))
                .map(f => `/${type}/${f}`)
            : []

          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-cache')
          res.end(JSON.stringify(files))
        } catch {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify([]))
        }
      })

      // Upload to Cloudinary (server-side signed upload — keeps credentials out of the browser)
      server.middlewares.use('/api/cloudinary-upload', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        const cloudName = env.CLOUDINARY_CLOUD_NAME
        const apiKey = env.CLOUDINARY_API_KEY
        const apiSecret = env.CLOUDINARY_API_SECRET

        if (!cloudName || !apiKey || !apiSecret) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Cloudinary não configurado. Verifique CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET no arquivo .env' }))
          return
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk: Buffer) => chunks.push(chunk))
        req.on('end', async () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString())
            const { file, folder = 'email-assets' } = body as { file: string; folder?: string }

            if (!file) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Campo "file" ausente' }))
              return
            }

            const timestamp = Math.floor(Date.now() / 1000)
            // Cloudinary signed upload: params sorted alphabetically + apiSecret, hashed with SHA-1
            const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
            const signature = createHash('sha1').update(paramsToSign).digest('hex')

            // Use URL-encoded body for reliability with data URIs
            const params = new URLSearchParams()
            params.append('file', file)
            params.append('api_key', apiKey)
            params.append('timestamp', String(timestamp))
            params.append('signature', signature)
            params.append('folder', folder)

            const cloudRes = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() }
            )
            const data = await cloudRes.json() as { secure_url?: string; error?: { message: string } }

            if (!cloudRes.ok || data.error) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: data.error?.message ?? 'Erro no upload' }))
              return
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ url: data.secure_url }))
          } catch (e) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: String(e) }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), localAssetsPlugin(env)],
  }
})
