# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com o código deste repositório.

## Comandos

```bash
npm run dev      # Inicia o servidor de desenvolvimento em http://localhost:5173
npm run build    # Verificação TypeScript + build de produção Vite
npm run preview  # Visualiza o build de produção
npx tsc --noEmit # Verificação de tipos TypeScript sem compilar
```

## Visão Geral da Arquitetura

Editor local de emails que gera HTML/CSS compatível com Gmail e Outlook a partir de um editor visual baseado em blocos. Sem backend, sem autenticação.

### Fluxo de estado

A única fonte de verdade é `src/store/editorStore.ts` (Zustand). Ela mantém um `EmailDocument` (configurações globais + array ordenado de `Block`s). Cada edição chama `updateBlockProps(id, partialProps)`, que salva automaticamente no `localStorage` com debounce de 500ms.

### Adicionando um bloco novo (caminho completo)

1. **Definição de tipo** — adicionar ao union `BlockType` e criar interface `XxxProps` em `src/blocks/types.ts`
2. **Props padrão** — adicionar constante `DEFAULT_XXX` e registrar no mapa `DEFAULTS` em `src/blocks/index.ts`
3. **Labels/ícones** — adicionar entradas em `BLOCK_LABELS` e `BLOCK_ICONS` em `src/blocks/index.ts`
4. **Render no editor** — criar `src/blocks/xxx/XxxBlock.tsx` (React + estilos inline, usa `fontStack()` de utils/fonts)
5. **Gerador HTML** — criar `src/blocks/xxx/xxxHtml.ts` (baseado em tabelas, CSS inline, compatível com email)
6. **Registrar render** — adicionar ao switch `renderBlock()` em `src/components/Editor/BlockItem.tsx`
7. **Registrar gerador** — adicionar ao switch `generateBlockHtml()` em `src/generator/htmlGenerator.ts`
8. **Controles do bloco** — adicionar componente `XxxControls` e renderizá-lo em `src/components/Sidebar/BlockControls.tsx`
9. **Biblioteca de blocos** — adicionar o tipo ao array `BLOCK_TYPES` em `src/components/Sidebar/BlockLibrary.tsx`

### Regras do gerador HTML (críticas para compatibilidade com email)

Todo output de `src/generator/` deve seguir:
- Layout via `<table role="presentation">` aninhadas, nunca `<div>`, flexbox ou grid
- Todo CSS inline (`style=""`) — sem folhas de estilo externas para propriedades críticas de layout
- Atributo `bgcolor=""` no `<td>` além do CSS (fallback para Outlook)
- `width` e `height` como atributos HTML em `<img>` e `<table>`
- Botões como `<a>` estilizado inline, nunca `<button>`
- Sem `position:absolute`, `float`, `animation` ou `transition` no HTML de saída
- Imagens de fundo: usar CSS `background-image` + comentários condicionais VML para Outlook
- Classes mobile (`mobile-full`, `mobile-stack`, etc.) adicionadas para media queries
- Fontes sempre usam `fontStack(family)` de `src/utils/fonts.ts`, que adiciona fallbacks seguros

### Biblioteca de componentes UI (`src/components/ui/`)

| Componente | Uso |
|---|---|
| `TextInput` / `TextArea` | Campos de texto livre |
| `ColorPicker` | `<input type="color">` nativo + campo de texto hex |
| `FontSelector` | Dropdown com as 17 Google Fonts de `fonts.ts` |
| `SliderInput` / `NumberInput` | Valores numéricos |
| `ToggleSwitch` | Booleano |
| `SelectInput` | Opções fixas (enum) |
| `ImageInput` | Duas abas: URL externa (texto livre) e Local (`/images/arquivo.jpg`) |
| `ListEditor<T>` | Lista genérica e ordenável para arrays (cards, diferenciais, etc.) |
| `StarRating` | Avaliação de 1 a 5 estrelas |
| `Section` | Wrapper de seção colapsável usado nos painéis de controle |

### Fontes

`src/utils/fonts.ts` exporta `FONTS` (17 Google Fonts) e `fontStack(family)` que retorna a string CSS `font-family` com fallbacks. `buildGoogleFontsUrl(families)` gera a URL para o `<link>` no HTML de saída. `injectGoogleFontsInEditor(families)` injeta as fontes dinamicamente na página do editor para preview em tempo real.

### Imagens locais

Coloque arquivos em `public/images/` — servidos estaticamente em `/images/arquivo.jpg`. No `ImageInput`, a aba "Local" permite digitar esses caminhos. O HTML gerado usa esses caminhos relativos, portanto é necessário substituí-los por URLs absolutas antes de enviar o email.

### Aviso no export

Ao exportar, a UI exibe:
> ⚠️ Substitua todos os caminhos `/images/nome.jpg` por URLs públicas absolutas antes de enviar.
