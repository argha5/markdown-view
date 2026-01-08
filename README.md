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
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\argha> wrangler --version

 ⛅️ wrangler 4.57.0
───────────────────
PS C:\Users\argha> wrangler login

 ⛅️ wrangler 4.57.0
───────────────────
Attempting to login via OAuth...
Opening a link in your default browser: https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=54d11594-84e4-41aa-b438-e81b8fa78ee7&redirect_uri=http%3A%2F%2Flocalhost%3A8976%2Foauth%2Fcallback&scope=account%3Aread%20user%3Aread%20workers%3Awrite%20workers_kv%3Awrite%20workers_routes%3Awrite%20workers_scripts%3Awrite%20workers_tail%3Aread%20d1%3Awrite%20pages%3Awrite%20zone%3Aread%20ssl_certs%3Awrite%20ai%3Awrite%20queues%3Awrite%20pipelines%3Awrite%20secrets_store%3Awrite%20containers%3Awrite%20cloudchamber%3Awrite%20connectivity%3Aadmin%20offline_access&state=_LzlBxzV-LD_egvPDDAChOuNCMVE.W7_&code_challenge=7MNZ3TU6brYdTOOIYI0SxeaBaJiplbaSNqh5xP7YIu0&code_challenge_method=S256
Successfully logged in.
PS C:\Users\argha> wrangler generate markdownworker

✘ [ERROR] Unknown arguments: generate, markdownworker


wrangler

COMMANDS
  wrangler docs [search..]        📚 Open Wrangler's command documentation in your browser

  wrangler init [name]            📥 Initialize a basic Worker
  wrangler dev [script]           👂 Start a local server for developing your Worker
  wrangler deploy [script]        🆙 Deploy a Worker to Cloudflare
  wrangler setup                  🪄 Setup a project to work on Cloudflare [experimental]
  wrangler deployments            🚢 List and view the current and past deployments for your Worker
  wrangler rollback [version-id]  🔙 Rollback a deployment for a Worker
  wrangler versions               🫧 List, view, upload and deploy Versions of your Worker to Cloudflare
  wrangler triggers               🎯 Updates the triggers of your current deployment [experimental]
  wrangler delete [script]        🗑 Delete a Worker from Cloudflare
  wrangler tail [worker]          🦚 Start a log tailing session for a Worker
  wrangler secret                 🤫 Generate a secret that can be referenced in a Worker
  wrangler types [path]           📝 Generate types from your Worker configuration

  wrangler kv                     🗂️ Manage Workers KV Namespaces
  wrangler queues                 📬 Manage Workers Queues
  wrangler r2                     📦 Manage R2 buckets & objects
  wrangler d1                     🗄 Manage Workers D1 databases
  wrangler vectorize              🧮 Manage Vectorize indexes
  wrangler hyperdrive             🚀 Manage Hyperdrive databases
  wrangler cert                   🪪 Manage client mTLS certificates and CA certificate chains used for secured connections [open beta]
  wrangler pages                  ⚡️ Configure Cloudflare Pages
  wrangler mtls-certificate       🪪 Manage certificates used for mTLS connections
  wrangler containers             📦 Manage Containers [open beta]
  wrangler pubsub                 📮 Manage Pub/Sub brokers [private beta]
  wrangler dispatch-namespace     🏗️ Manage dispatch namespaces
  wrangler ai                     🤖 Manage AI models
  wrangler secrets-store          🔐 Manage the Secrets Store [open beta]
  wrangler workflows              🔁 Manage Workflows
  wrangler pipelines              🚰 Manage Cloudflare Pipelines [open beta]
  wrangler vpc                    🌐 Manage VPC [open beta]
  wrangler login                  🔓 Login to Cloudflare
  wrangler logout                 🚪 Logout from Cloudflare
  wrangler whoami                 🕵️ Retrieve your user information
  wrangler auth                   🔐 Manage authentication

GLOBAL FLAGS
  -c, --config    Path to Wrangler configuration file  [string]
      --cwd       Run as if Wrangler was started in the specified directory instead of the current working directory  [string]
  -e, --env       Environment to use for operations, and for selecting .env and .dev.vars files  [string]
      --env-file  Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files  [array]
  -h, --help      Show help  [boolean]
  -v, --version   Show version number  [boolean]

Please report any issues to https://github.com/cloudflare/workers-sdk/issues/new/choose
🪵  Logs were written to "C:\Users\argha\AppData\Roaming\xdg.config\.wrangler\logs\wrangler-2026-01-07_12-41-53_884.log"
PS C:\Users\argha> cd markdownworker
cd : Cannot find path 'C:\Users\argha\markdownworker' because it does not exist.
At line:1 char:1
+ cd markdownworker
+ ~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (C:\Users\argha\markdownworker:String) [Set-Location], ItemNotFoundExcep
   tion
    + FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.SetLocationCommand

PS C:\Users\argha> wrangler init markdownworker

 ⛅️ wrangler 4.57.0
───────────────────
🌀 Running `npm create cloudflare@^2.5.0 markdownworker --`...
Need to install the following packages:
create-cloudflare@2.62.0
Ok to proceed? (y) y


> npx
> create-cloudflare markdownworker


──────────────────────────────────────────────────────────────────────────────────────────────────────────
👋 Welcome to create-cloudflare v2.62.0!
🧡 Let's get started.
📊 Cloudflare collects telemetry about your usage of Create-Cloudflare.

Learn more at: https://github.com/cloudflare/workers-sdk/blob/main/packages/create-cloudflare/telemetry.md
──────────────────────────────────────────────────────────────────────────────────────────────────────────

╭ Create an application with Cloudflare Step 1 of 3
│
├ In which directory do you want to create your application?
│ dir ./markdownworker
│
├ What would you like to start with?
│ category Hello World example
│
├ Which template would you like to use?
│ type Worker only
│
├ Which language do you want to use?
│ lang JavaScript
│
├ Copying template files
│ files copied to project directory
│
├ Updating name in `package.json`
│ updated `package.json`
│
├ Installing dependencies
│ installed via `npm install`
│
╰ Application created

╭ Configuring your application for Cloudflare Step 2 of 3
│
├ Installing wrangler A command line tool for building Cloudflare Workers
│ installed via `npm install wrangler --save-dev`
│
├ Retrieving current workerd compatibility date
│ compatibility date  Could not find workerd date, falling back to 2025-09-27
│
├ Do you want to use git for version control?
│ yes git
│
├ Initializing git repo
│ initialized git
│
├ Committing new files
│ git commit
│
╰ Application configured

╭ Deploy with Cloudflare Step 3 of 3
│
├ Do you want to deploy your application?
│ yes deploy via `npm run deploy`
│
├ Logging into Cloudflare checking authentication status
│ logged in
│
├ Selecting Cloudflare account retrieving accounts
│ account Abantyghosh6@gmail.com's Account
│

> markdownworker@0.0.0 deploy
> wrangler deploy


Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md

 ⛅️ wrangler 4.57.0
───────────────────
Total Upload: 0.19 KiB / gzip: 0.16 KiB
Uploaded markdownworker (5.91 sec)
▲ [WARNING] You need to register a workers.dev subdomain before publishing to workers.dev


√ Would you like to register a workers.dev subdomain now? ... yes
√ What would you like your workers.dev subdomain to be? It will be accessible at https://<subdomain>.workers.dev ... markdownworker123
√ Creating a workers.dev subdomain for your account at https://markdownworker123.workers.dev. Ok to proceed? ... yes
Success! It may take a few minutes for DNS records to update.
Visit https://dash.cloudflare.com/7575382a6a261f0caef8febf3ca3044a/workers/subdomain to edit your workers.dev subdomain
Deployed markdownworker triggers (105.88 sec)
  https://markdownworker.markdownworker123.workers.dev
Current Version ID: dc889e43-c743-4fb3-b380-5f94d5828f05
├ Waiting for DNS to propagate. This might take a few minutes.
│ DNS propagation complete.
│
╰  ERROR  Error: 18760000:error:0A000410:SSL routines:ssl3_read_bytes:sslv3 alert handshake failure:c:\ws\deps\openssl\openssl\ssl\record\rec_layer_s3.c:1605:SSL alert number 40

┘ Waiting for deployment to become available (10s) .
PS C:\Users\argha>