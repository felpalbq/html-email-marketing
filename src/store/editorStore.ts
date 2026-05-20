import { create } from 'zustand'
import { nanoid } from '../utils/nanoid'
import { createBlock } from '../blocks/index'
import type { Block, BlockType, EmailDocument, GlobalSettings } from '../blocks/types'

const DEFAULT_GLOBAL: GlobalSettings = {
  emailName: 'Minha Campanha de Email',
  previewText: '',
  emailWidth: 600,
  backgroundColor: '#f3f4f6',
  defaultFontFamily: 'Inter',
  defaultTextColor: '#111827',
  defaultLinkColor: '#6366f1',
}

const DEFAULT_DOCUMENT: EmailDocument = {
  id: nanoid(),
  name: 'Minha Campanha de Email',
  globalSettings: DEFAULT_GLOBAL,
  blocks: [],
}

function loadFromStorage(): EmailDocument | null {
  try {
    const raw = localStorage.getItem('email-editor-doc')
    if (!raw) return null
    return JSON.parse(raw) as EmailDocument
  } catch {
    return null
  }
}

interface EditorStore {
  document: EmailDocument
  selectedBlockId: string | null
  previewMode: 'desktop' | 'mobile'
  showPreview: boolean
  showSettings: boolean

  addBlock: (type: BlockType, position?: number) => void
  removeBlock: (id: string) => void
  duplicateBlock: (id: string) => void
  reorderBlocks: (from: number, to: number) => void
  updateBlockProps: (id: string, props: Partial<Record<string, unknown>>) => void
  toggleBlockVisibility: (id: string) => void
  selectBlock: (id: string | null) => void
  setPreviewMode: (mode: 'desktop' | 'mobile') => void
  setShowPreview: (show: boolean) => void
  setShowSettings: (show: boolean) => void
  updateGlobalSettings: (settings: Partial<GlobalSettings>) => void
  updateDocumentName: (name: string) => void
  newDocument: () => void
  saveToLocalStorage: () => void
  loadFromLocalStorage: () => void
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null

export const useEditorStore = create<EditorStore>((set, get) => ({
  document: loadFromStorage() ?? DEFAULT_DOCUMENT,
  selectedBlockId: null,
  previewMode: 'desktop',
  showPreview: false,
  showSettings: false,

  addBlock: (type, position) => {
    const block = createBlock(type)
    set(state => {
      const blocks = [...state.document.blocks]
      if (position !== undefined) {
        blocks.splice(position, 0, block)
      } else {
        blocks.push(block)
      }
      return {
        document: { ...state.document, blocks },
        selectedBlockId: block.id,
      }
    })
    get().saveToLocalStorage()
  },

  removeBlock: (id) => {
    set(state => ({
      document: {
        ...state.document,
        blocks: state.document.blocks.filter(b => b.id !== id),
      },
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    }))
    get().saveToLocalStorage()
  },

  duplicateBlock: (id) => {
    set(state => {
      const idx = state.document.blocks.findIndex(b => b.id === id)
      if (idx === -1) return state
      const original = state.document.blocks[idx]
      const copy: Block = { ...original, id: nanoid(), props: { ...original.props } }
      const blocks = [...state.document.blocks]
      blocks.splice(idx + 1, 0, copy)
      return {
        document: { ...state.document, blocks },
        selectedBlockId: copy.id,
      }
    })
    get().saveToLocalStorage()
  },

  reorderBlocks: (from, to) => {
    set(state => {
      const blocks = [...state.document.blocks]
      const [removed] = blocks.splice(from, 1)
      blocks.splice(to, 0, removed)
      return { document: { ...state.document, blocks } }
    })
    get().saveToLocalStorage()
  },

  updateBlockProps: (id, props) => {
    set(state => ({
      document: {
        ...state.document,
        blocks: state.document.blocks.map(b =>
          b.id === id ? { ...b, props: { ...b.props, ...props } } : b
        ),
      },
    }))
    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => get().saveToLocalStorage(), 500)
  },

  toggleBlockVisibility: (id) => {
    set(state => ({
      document: {
        ...state.document,
        blocks: state.document.blocks.map(b =>
          b.id === id ? { ...b, visible: !b.visible } : b
        ),
      },
    }))
    get().saveToLocalStorage()
  },

  selectBlock: (id) => set({ selectedBlockId: id }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setShowPreview: (show) => set({ showPreview: show }),
  setShowSettings: (show) => set({ showSettings: show }),

  updateGlobalSettings: (settings) => {
    set(state => ({
      document: {
        ...state.document,
        globalSettings: { ...state.document.globalSettings, ...settings },
      },
    }))
    get().saveToLocalStorage()
  },

  updateDocumentName: (name) => {
    set(state => ({ document: { ...state.document, name } }))
    get().saveToLocalStorage()
  },

  newDocument: () => {
    if (!confirm('Iniciar um novo email? O trabalho atual será perdido.')) return
    const doc = { ...DEFAULT_DOCUMENT, id: nanoid(), name: 'My Email Campaign', blocks: [] }
    set({ document: doc, selectedBlockId: null })
    localStorage.removeItem('email-editor-doc')
  },

  saveToLocalStorage: () => {
    try {
      localStorage.setItem('email-editor-doc', JSON.stringify(get().document))
    } catch { /* ignore quota errors */ }
  },

  loadFromLocalStorage: () => {
    const doc = loadFromStorage()
    if (doc) set({ document: doc, selectedBlockId: null })
  },
}))
