import { useEffect, useRef, useState } from 'react'

interface PreviewFrameProps {
  html: string
  mode: 'desktop' | 'mobile'
}

export function PreviewFrame({ html, mode }: PreviewFrameProps) {
  const width = mode === 'mobile' ? 360 : 680
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(600)
  const htmlWithBase = html.replace('<head>', `<head><base href="${window.location.origin}/">`);

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const resize = () => {
      try {
        const body = iframe.contentDocument?.body
        if (body) setHeight(Math.max(600, body.scrollHeight + 32))
      } catch { /* cross-origin guard */ }
    }

    iframe.addEventListener('load', resize)
    return () => iframe.removeEventListener('load', resize)
  }, [html])

  return (
    <div className="flex justify-center py-8">
      <div style={{ width }} className="relative">
        <iframe
          ref={iframeRef}
          srcDoc={htmlWithBase}
          width={width}
          style={{
            border: 'none',
            height,
            display: 'block',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            borderRadius: 8,
            backgroundColor: '#fff',
          }}
          title="Email Preview"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  )
}
