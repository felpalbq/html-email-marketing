interface PreviewFrameProps {
  html: string
  mode: 'desktop' | 'mobile'
}

export function PreviewFrame({ html, mode }: PreviewFrameProps) {
  const width = mode === 'mobile' ? 360 : 680

  return (
    <div className="flex justify-center py-8">
      <div style={{ width }} className="relative">
        <iframe
          srcDoc={html}
          width={width}
          style={{
            border: 'none',
            height: '100vh',
            minHeight: 600,
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
