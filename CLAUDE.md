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

---

## Assets Locais (Imagens e Ícones)

### Pastas

| Pasta | Finalidade | URL no editor |
|---|---|---|
| `public/images/` | Imagens de email (banners, cards, avatares, etc.) | `/images/arquivo.jpg` |
| `public/icons/` | Ícones PNG/SVG (redes sociais, feature list, etc.) | `/icons/icone.svg` |

- Formatos aceitos para imagens: `.jpg`, `.jpeg`, `.png`, `.svg`, `.gif`, `.webp`
- Formatos aceitos para ícones: `.png`, `.svg`, `.jpg`, `.jpeg`
- Arquivos adicionados às pastas aparecem **automaticamente** na interface após clicar "↻ Atualizar" no AssetBrowser

### API de listagem (Vite dev server)

```
GET /api/local-assets?type=images   → string[] de caminhos locais
GET /api/local-assets?type=icons    → string[] de caminhos locais
```

Implementada como plugin Vite em `vite.config.ts` — disponível apenas no dev server (não em produção).

### Uso no editor

Todo `ImageInput` tem três abas:
- **URL** — digita ou cola URL externa (HTTPS)
- **Local** — digita caminho manual (`/images/arquivo.jpg`)
- **Biblioteca / Ícones** — abre o `AssetBrowser` com grid visual dos arquivos locais

No `AssetBrowser` (`src/components/ui/AssetBrowser.tsx`):
- Clique na imagem → usa o caminho local diretamente
- Hover → botão **"↑ Cloudinary"** → faz upload e substitui pelo URL público gerado

---

## Integração Cloudinary

### Credenciais (em `.env` — nunca commitado)

```
CLOUDINARY_CLOUD_NAME=dsgormtug
CLOUDINARY_API_KEY=137722895472255
CLOUDINARY_API_SECRET=<secret>
```

> O cloud `dnm5ecbqk` pertence à integração MCP do Claude Code — **diferente** do cloud pessoal do projeto (`dsgormtug`).

### Endpoint de upload (Vite dev server)

```
POST /api/cloudinary-upload
Content-Type: application/json
Body: { "file": "<data URI ou URL>", "folder": "email-assets/images" }
Response: { "url": "https://res.cloudinary.com/dsgormtug/..." }
```

- Implementado em `vite.config.ts` como middleware do dev server
- Upload **assinado server-side** com SHA-1 — credenciais nunca expostas ao browser
- Pasta destino padrão: `email-assets/images` ou `email-assets/icons`
- Disponível apenas no dev server (não em produção)

### Fluxo do upload no browser

1. `AssetBrowser` lê o arquivo local via `fetch(localPath)` → converte para base64 data URI
2. Envia `POST /api/cloudinary-upload` com o data URI
3. Plugin Vite assina a requisição com HMAC-SHA1 e credenciais do `.env`
4. Cloudinary retorna `secure_url` → substituída no campo de imagem do bloco

---

## Compatibilidade Dark Mode (Gmail)

O HTML gerado inclui proteções contra inversão de cores no dark mode do Gmail:

```html
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
```

CSS no `<head>`:
```css
:root { color-scheme: light; }
u + .u-body { background-color: <cor> !important; }   /* Gmail web */
[data-ogsc] body { background-color: <cor> !important; } /* Gmail app */
@media (prefers-color-scheme: dark) { ... }             /* Apple Mail / Samsung */
```

Regras críticas nos blocos HTML:
- Todo `<td>` com cor de fundo tem `bgcolor=""` (atributo) além do `background-color` inline
- Overlays transparentes usam `rgba(0,0,0,0)` — nunca a palavra `transparent`

---

## Formatação de Texto — Props disponíveis por bloco

Todos os novos props de formatação usam `?? defaultValue` para retrocompatibilidade com dados salvos no localStorage.

| Bloco | Props de formatação adicionais |
|---|---|
| `hero` | `headlineLineHeight`, `headlineLetterSpacing`, `subtitleLineHeight`, `backgroundPosition` |
| `announcement` | `lineHeight`, `letterSpacing` |
| `sectionHeader` | `titleLineHeight`, `titleLetterSpacing`, `subtitleLineHeight` |
| `ctaBanner` | `headlineLineHeight`, `headlineLetterSpacing`, `bodyLineHeight`, `bodyFontSize`, `imageWidth`, `imageAlignment` |
| `cardGrid` | `titleLineHeight`, `descriptionLineHeight`, `imageHeight` (por card) |
| `footer` | `icon`, `iconSize` por `SocialLink` (ícone PNG customizado) |

---

## Adicionando um bloco novo (caminho completo)

1. **Definição de tipo** — adicionar ao union `BlockType` e criar interface `XxxProps` em `src/blocks/types.ts`
2. **Props padrão** — adicionar constante `DEFAULT_XXX` e registrar no mapa `DEFAULTS` em `src/blocks/index.ts`
3. **Labels/ícones** — adicionar entradas em `BLOCK_LABELS` e `BLOCK_ICONS` em `src/blocks/index.ts`
4. **Render no editor** — criar `src/blocks/xxx/XxxBlock.tsx` (React + estilos inline, usa `fontStack()` de utils/fonts)
5. **Gerador HTML** — criar `src/blocks/xxx/xxxHtml.ts` (baseado em tabelas, CSS inline, compatível com email)
6. **Registrar render** — adicionar ao switch `renderBlock()` em `src/components/Editor/BlockItem.tsx`
7. **Registrar gerador** — adicionar ao switch `generateBlockHtml()` em `src/generator/htmlGenerator.ts`
8. **Controles do bloco** — adicionar componente `XxxControls` e renderizá-lo em `src/components/Sidebar/BlockControls.tsx`
9. **Biblioteca de blocos** — adicionar o tipo ao array `BLOCK_TYPES` em `src/components/Sidebar/BlockLibrary.tsx`

---

## Regras do gerador HTML (críticas para compatibilidade com email)

Todo output de `src/generator/` deve seguir:

- Layout via `<table role="presentation">` aninhadas — **nunca** `<div>`, flexbox ou grid
- Todo CSS **inline** (`style=""`) — sem folhas de estilo externas para propriedades críticas de layout
- Atributo `bgcolor=""` no `<td>` além do CSS (fallback Outlook + dark mode)
- `width` e `height` como atributos HTML em `<img>` e `<table>`
- Botões como `<a>` estilizado inline, nunca `<button>`
- Sem `position:absolute`, `float`, `animation` ou `transition` no HTML de saída
- Imagens de fundo: CSS `background-image` + comentários VML `<!--[if gte mso 9]>` para Outlook
- Classes mobile (`mobile-full`, `mobile-stack`, `mobile-col`, `mobile-img`, etc.) para media queries
- Fontes sempre via `fontStack(family)` de `src/utils/fonts.ts` — nunca font-family direto
- Props novos sempre com fallback `?? defaultValue` — mantém retrocompat com localStorage
- `mso-line-height-rule:exactly` junto a qualquer `line-height` customizado (Outlook)
- Overlays transparentes: `rgba(0,0,0,0)` — nunca a palavra `transparent`

---

## Biblioteca de componentes UI (`src/components/ui/`)

| Componente | Uso |
|---|---|
| `TextInput` / `TextArea` | Campos de texto livre |
| `ColorPicker` | `<input type="color">` nativo + campo de texto hex |
| `FontSelector` | Dropdown com as 17 Google Fonts de `fonts.ts` |
| `SliderInput` | Range numérico — suporta `step` fracionário (ex: `step={0.05}` para lineHeight) |
| `NumberInput` | Input numérico direto |
| `ToggleSwitch` | Booleano |
| `SelectInput` | Opções fixas (enum) |
| `ImageInput` | 3 abas: URL externa, caminho local, AssetBrowser — prop `assetType="images"\|"icons"` |
| `AssetBrowser` | Grid de assets locais com upload Cloudinary integrado |
| `ListEditor<T>` | Lista genérica e ordenável para arrays (cards, diferenciais, etc.) |
| `StarRating` | Avaliação de 1 a 5 estrelas |
| `Section` | Wrapper de seção colapsável nos painéis de controle |

---

## Fontes

`src/utils/fonts.ts` exporta `FONTS` (17 Google Fonts) e `fontStack(family)` que retorna a string CSS `font-family` com fallbacks. `buildGoogleFontsUrl(families)` gera a URL para o `<link>` no HTML de saída. `injectGoogleFontsInEditor(families)` injeta as fontes dinamicamente no editor para preview em tempo real.

---

## Notas de produção

- Imagens com caminho local (`/images/...`, `/icons/...`) **devem** ser enviadas ao Cloudinary antes de exportar o email — o AssetBrowser faz isso automaticamente
- O endpoint `/api/cloudinary-upload` e `/api/local-assets` existem apenas no dev server; em produção esses endpoints não existem
- O build de produção (`npm run build`) gera apenas o editor estático — sem lógica de upload
