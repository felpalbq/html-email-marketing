import { create } from 'zustand'
import { nanoid } from '../utils/nanoid'
import { createBlock, DEFAULTS } from '../blocks/index'
import type { Block, BlockType, EmailDocument, GlobalSettings } from '../blocks/types'

const DEFAULT_GLOBAL: GlobalSettings = {
  emailName: 'Minha Campanha de Email',
  previewText: '',
  emailWidth: 600,
  backgroundColor: '#f3f4f6',
}

const DEFAULT_DOCUMENT: EmailDocument = {
  id: nanoid(),
  name: 'Minha Campanha de Email',
  globalSettings: DEFAULT_GLOBAL,
  blocks: [],
}

function migrateBlock(block: Block): Block {
  const defaults = DEFAULTS[block.type]
  if (!defaults) return block
  return { ...block, props: { ...defaults, ...block.props } }
}

function loadFromStorage(): EmailDocument | null {
  try {
    const raw = localStorage.getItem('email-editor-doc')
    if (!raw) return null
    const doc = JSON.parse(raw) as EmailDocument
    return { ...doc, blocks: doc.blocks.map(migrateBlock) }
  } catch {
    return null
  }
}

const HISTORY_LIMIT = 20

interface EditorStore {
  document: EmailDocument
  history: EmailDocument[]
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
  undo: () => void
  newDocument: () => void
  saveToLocalStorage: () => void
  loadFromLocalStorage: () => void
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null
let historyTimer: ReturnType<typeof setTimeout> | null = null
let pendingHistoryDoc: EmailDocument | null = null

function flushPendingHistory(pushFn: (snapshot: EmailDocument) => void) {
  if (!pendingHistoryDoc) return
  if (historyTimer) { clearTimeout(historyTimer); historyTimer = null }
  pushFn(pendingHistoryDoc)
  pendingHistoryDoc = null
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  document: loadFromStorage() ?? DEFAULT_DOCUMENT,
  history: [],
  selectedBlockId: null,
  previewMode: 'desktop',
  showPreview: false,
  showSettings: false,

  addBlock: (type, position) => {
    const block = createBlock(type)
    flushPendingHistory(snapshot => set(state => ({ history: [...state.history.slice(-HISTORY_LIMIT + 1), snapshot] })))
    set(state => {
      const blocks = [...state.document.blocks]
      if (position !== undefined) blocks.splice(position, 0, block)
      else blocks.push(block)
      return {
        history: [...state.history.slice(-HISTORY_LIMIT + 1), state.document],
        document: { ...state.document, blocks },
        selectedBlockId: block.id,
      }
    })
    get().saveToLocalStorage()
  },

  removeBlock: (id) => {
    flushPendingHistory(snapshot => set(state => ({ history: [...state.history.slice(-HISTORY_LIMIT + 1), snapshot] })))
    set(state => ({
      history: [...state.history.slice(-HISTORY_LIMIT + 1), state.document],
      document: {
        ...state.document,
        blocks: state.document.blocks.filter(b => b.id !== id),
      },
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    }))
    get().saveToLocalStorage()
  },

  duplicateBlock: (id) => {
    flushPendingHistory(snapshot => set(state => ({ history: [...state.history.slice(-HISTORY_LIMIT + 1), snapshot] })))
    set(state => {
      const idx = state.document.blocks.findIndex(b => b.id === id)
      if (idx === -1) return state
      const original = state.document.blocks[idx]
      const copy: Block = { ...original, id: nanoid(), props: { ...original.props } }
      const blocks = [...state.document.blocks]
      blocks.splice(idx + 1, 0, copy)
      return {
        history: [...state.history.slice(-HISTORY_LIMIT + 1), state.document],
        document: { ...state.document, blocks },
        selectedBlockId: copy.id,
      }
    })
    get().saveToLocalStorage()
  },

  reorderBlocks: (from, to) => {
    flushPendingHistory(snapshot => set(state => ({ history: [...state.history.slice(-HISTORY_LIMIT + 1), snapshot] })))
    set(state => {
      const blocks = [...state.document.blocks]
      const [removed] = blocks.splice(from, 1)
      blocks.splice(to, 0, removed)
      return {
        history: [...state.history.slice(-HISTORY_LIMIT + 1), state.document],
        document: { ...state.document, blocks },
      }
    })
    get().saveToLocalStorage()
  },

  updateBlockProps: (id, props) => {
    // Capture snapshot before the first change of this typing session
    if (!pendingHistoryDoc) {
      pendingHistoryDoc = get().document
    }

    set(state => ({
      document: {
        ...state.document,
        blocks: state.document.blocks.map(b =>
          b.id === id ? { ...b, props: { ...b.props, ...props } } : b
        ),
      },
    }))

    // Commit snapshot to history after user stops changing (1.5s inactivity)
    if (historyTimer) clearTimeout(historyTimer)
    historyTimer = setTimeout(() => {
      const snapshot = pendingHistoryDoc
      pendingHistoryDoc = null
      historyTimer = null
      if (snapshot) {
        set(state => ({
          history: [...state.history.slice(-HISTORY_LIMIT + 1), snapshot],
        }))
      }
      get().saveToLocalStorage()
    }, 1500)

    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => get().saveToLocalStorage(), 500)
  },

  toggleBlockVisibility: (id) => {
    set(state => ({
      history: [...state.history.slice(-HISTORY_LIMIT + 1), state.document],
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
      history: [...state.history.slice(-HISTORY_LIMIT + 1), state.document],
      document: {
        ...state.document,
        globalSettings: { ...state.document.globalSettings, ...settings },
      },
    }))
    get().saveToLocalStorage()
  },

  updateDocumentName: (name) => {
    set(state => ({
      history: [...state.history.slice(-HISTORY_LIMIT + 1), state.document],
      document: { ...state.document, name },
    }))
    get().saveToLocalStorage()
  },

  undo: () => {
    // Flush any pending prop-edit snapshot first
    if (pendingHistoryDoc) {
      if (historyTimer) { clearTimeout(historyTimer); historyTimer = null }
      const snapshot = pendingHistoryDoc
      pendingHistoryDoc = null
      set(state => ({
        history: [...state.history.slice(-HISTORY_LIMIT + 1), snapshot],
      }))
    }

    const { history } = get()
    if (history.length === 0) return
    const prev = history[history.length - 1]
    set(state => ({
      document: prev,
      history: state.history.slice(0, -1),
      selectedBlockId: null,
    }))
    get().saveToLocalStorage()
  },

  newDocument: () => {
    if (!confirm('Iniciar um novo email? O trabalho atual será perdido.')) return
    const doc = { ...DEFAULT_DOCUMENT, id: nanoid(), name: 'Minha Campanha de Email', blocks: [] }
    set({ document: doc, selectedBlockId: null, history: [] })
    localStorage.removeItem('email-editor-doc')
  },

  saveToLocalStorage: () => {
    try {
      localStorage.setItem('email-editor-doc', JSON.stringify(get().document))
    } catch { /* ignore quota errors */ }
  },

  loadFromLocalStorage: () => {
    const doc = loadFromStorage()
    if (doc) set({ document: doc, selectedBlockId: null, history: [] })
  },
}))
