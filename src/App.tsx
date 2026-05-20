import { useEffect } from 'react'
import { Topbar } from './components/Topbar/Topbar'
import { BlockLibrary } from './components/Sidebar/BlockLibrary'
import { Canvas } from './components/Editor/Canvas'
import { BlockControls } from './components/Sidebar/BlockControls'
import { PreviewModal } from './components/Preview/PreviewModal'
import { GlobalSettings } from './components/Sidebar/GlobalSettings'
import { useEditorStore } from './store/editorStore'
import { injectGoogleFontsInEditor, FONTS } from './utils/fonts'

function App() {
  const { showPreview, showSettings } = useEditorStore()

  // Inject all Google Fonts into the editor for live preview
  useEffect(() => {
    injectGoogleFontsInEditor(FONTS.map(f => f.value))
  }, [])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <BlockLibrary />
        <Canvas />
        <BlockControls />
      </div>
      {showPreview && <PreviewModal />}
      {showSettings && <GlobalSettings />}
    </div>
  )
}

export default App
