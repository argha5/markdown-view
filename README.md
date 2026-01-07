# 📝 Markdown Viewer

A fast, beautiful Markdown editor with live preview, AI assistance, and export features.

**🌐 Live Demo:** [https://markdown-viewer-51k.pages.dev](https://markdown-viewer-51k.pages.dev)

**📦 GitHub:** [https://github.com/argha5/markdown-view](https://github.com/argha5/markdown-view)

---

## ✨ Features

### Core Features
- 📝 **Live Preview** - Real-time markdown rendering
- 🎨 **22 Themes** - GitHub, Dracula, Nord, Catppuccin, etc.
- 📊 **GFM Support** - Tables, task lists, strikethrough
- 💻 **Syntax Highlighting** - Code blocks with language support
- 📐 **Mermaid Diagrams** - Flowcharts, sequence diagrams
- ➗ **LaTeX/KaTeX** - Mathematical equations

### AI Writing Assistant 🤖
- Grammar & clarity checking
- Text rewriting & improvement
- Document summarization
- Formatting suggestions

### Productivity
- 📜 **Version History** - Save/restore versions
- 🔍 **Find & Replace** - Ctrl+F search
- 📤 **Export** - Markdown, HTML, PDF
- 🔗 **Share** - Shareable URL links

---

## 🚀 Quick Start

```bash
git clone https://github.com/argha5/markdown-view.git
cd markdown-view
# Open index.html in browser - no build needed!
```

---

## 🤖 AI Assistant Setup (Groq API)

The AI features require a **free Groq API key**.

### Step 1: Get Your API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `gsk_`)

### Step 2: Use in App

1. Open the Markdown Viewer
2. Click the **green AI button** (robot icon)
3. Try any AI action (Grammar, Rewrite, etc.)
4. Enter your API key when prompted
5. Key is saved in browser localStorage

### API Configuration Details

| Setting | Value |
|---------|-------|
| API URL | `https://api.groq.com/openai/v1/chat/completions` |
| Model | `llama-3.3-70b-versatile` |
| Max Tokens | 2048 |
| Temperature | 0.7 |

### Where API Key is Stored

```javascript
// In script.js - API key stored in browser localStorage
const GROQ_API_KEY_STORAGE = 'groq_api_key';
let GROQ_API_KEY = localStorage.getItem(GROQ_API_KEY_STORAGE) || '';
```

### To Clear/Change API Key

Open browser console (F12) and run:
```javascript
localStorage.removeItem('groq_api_key');
location.reload();
```

---

## 🔧 Troubleshooting

### AI Not Working

| Problem | Solution |
|---------|----------|
| "API key required" | Enter your Groq API key when prompted |
| API Error 401 | Invalid API key - check key at console.groq.com |
| API Error 429 | Rate limited - wait a few seconds and retry |
| API Error 500 | Groq server error - try again later |

### Common Issues

**Preview not updating:**
- Check browser console for errors (F12)
- Try refreshing the page
- Clear localStorage and reload

**Themes not loading:**
- Ensure `themes.css` is in same folder as `index.html`
- Check file paths in HTML head

**Export not working:**
- PDF export requires internet (uses html2pdf.js CDN)
- Check if popup blockers are preventing download

---

## 📁 Project Structure

```
markdown-view/
├── index.html      # Main HTML (UI structure)
├── style.css       # Core styles + Phase 2 features
├── themes.css      # 22 theme definitions
├── script.js       # Application logic
├── README.md       # This documentation
├── LICENSE         # MIT License
└── .gitignore      # Git ignore rules
```

---

## 🛠️ Technical Reference

### Key Files & What They Do

#### `script.js` - Main Application Logic

| Section | Lines (approx) | Purpose |
|---------|----------------|---------|
| Configuration | 1-50 | Storage keys, themes, commands |
| Default Content | 50-140 | Sample markdown shown on first load |
| DOM Elements | 140-170 | Cached element references |
| Marked.js Init | 170-250 | Markdown parser configuration |
| Rendering | 250-400 | Preview, TOC, stats update |
| Undo/Redo | 400-450 | History management |
| Export | 450-600 | MD, HTML, PDF export |
| Theme System | 600-800 | Theme loading & switching |
| Command Palette | 800-1000 | Fuzzy search, command execution |
| Event Listeners | 1000-1170 | Keyboard, clicks, drag-drop |
| AI Assistant | 1170-1430 | Groq API integration |
| Version History | 1430-1550 | Save/restore versions |
| Find & Replace | 1550-1700 | Search functionality |
| Share | 1700-1780 | URL encoding/decoding |
| Init | 1780-1810 | Application startup |

### Important Functions

```javascript
// Render markdown to preview
function renderMarkdown() { ... }

// Update word count, reading time
function updateStats() { ... }

// Generate table of contents
function generateTOC() { ... }

// Call Groq API
async function callGroqAPI(messages) { ... }

// Save version to history
function saveVersion() { ... }

// Find text matches
function performFind() { ... }
```

### Storage Keys

| Key | Purpose |
|-----|---------|
| `markdown_content` | Saved document content |
| `markdown_theme` | Current theme ID |
| `markdown_toc_visible` | TOC sidebar state |
| `groq_api_key` | User's Groq API key |
| `markdown_history` | Version history (JSON array) |

---

## 🔄 How to Update/Modify

### Changing AI Model

In `script.js`, find and change:
```javascript
const GROQ_MODEL = 'llama-3.3-70b-versatile';
// Change to other Groq models like:
// 'llama-3.1-8b-instant' (faster, less accurate)
// 'mixtral-8x7b-32768' (alternative model)
```

### Adding New Theme

1. Open `themes.css`
2. Copy an existing theme block
3. Change the `[data-theme="your-theme-name"]` selector
4. Update colors
5. Add to `THEMES` array in `script.js`:
```javascript
{ id: 'your-theme-name', name: 'Display Name', colors: ['bg', 'accent', 'text'] }
```

### Adding New Command

In `script.js`, add to `COMMANDS` array:
```javascript
{ id: 'my-command', title: 'My Command', desc: 'Description', shortcut: ['Ctrl', 'M'], icon: '🔥' }
```

Then add handler in `executeCommand`:
```javascript
case 'my-command': myFunction(); break;
```

---

## 📦 Dependencies (CDN)

All loaded from CDN - no npm/node required:

| Library | Version | Purpose |
|---------|---------|---------|
| Marked.js | 9.1.6 | Markdown parsing |
| Highlight.js | 11.9.0 | Code highlighting |
| Mermaid | 10.6.1 | Diagrams |
| KaTeX | 0.16.9 | Math rendering |
| html2pdf.js | 0.10.1 | PDF export |
| Inter Font | - | UI typography |
| JetBrains Mono | - | Code typography |

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 👨‍💻 Author

**Argha** - [@argha5](https://github.com/argha5)

---

⭐ Star this repo if you find it useful!
