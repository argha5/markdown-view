# 🛠️ Manage & Update Guide

Quick reference for updating and managing your Markdown Viewer.

---

## 📁 Project Files

| File | Purpose |
|------|---------|
| `index.html` | Main HTML structure |
| `script.js` | Application logic + AI |
| `style.css` | Styling |
| `themes.css` | 22 theme definitions |
| `config.js` | API key (gitignored) |

---

## 🔄 Update & Deploy Workflow

### Step 1: Edit Files Locally
Make changes to any file in `c:\Markdown\`

### Step 2: Copy to Dist Folder
```powershell
cd c:\Markdown
Copy-Item index.html, script.js, style.css, themes.css, config.js, README.md, LICENSE -Destination dist -Force
```

### Step 3: Deploy to Cloudflare
```powershell
npx wrangler pages deploy dist --project-name markdown-viewer
```

### Step 4: Push to GitHub (Optional)
```powershell
git add .
git commit -m "Your update message"
git push origin main
```

> ⚠️ **Note:** `config.js` is gitignored - it won't be pushed to GitHub (keeps API key safe).

---

## 🤖 AI Configuration

### Change API Key
Edit `c:\Markdown\config.js`:
```javascript
const CONFIG_API_KEY = 'your-new-groq-api-key-here';
```

### Change AI Model
Edit `c:\Markdown\script.js`, find line ~1177:
```javascript
const GROQ_MODEL = 'llama-3.3-70b-versatile';
// Other options:
// 'llama-3.1-8b-instant' - faster
// 'mixtral-8x7b-32768' - alternative
```

### Get New API Key
1. Go to [console.groq.com](https://console.groq.com)
2. API Keys → Create API Key
3. Copy key (starts with `gsk_`)

---

## 🎨 Add New Theme

### Step 1: Edit `themes.css`
Add at the end:
```css
[data-theme="my-theme"] {
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --text-primary: #eaeaea;
    --accent-primary: #e94560;
    /* ... more variables */
}
```

### Step 2: Edit `script.js`
Find `THEMES` array (~line 20) and add:
```javascript
{ id: 'my-theme', name: 'My Theme', colors: ['#1a1a2e', '#e94560', '#eaeaea'] }
```

---

## ⌨️ Add New Command

### Step 1: Edit `script.js`
Find `COMMANDS` array (~line 30) and add:
```javascript
{ id: 'my-command', title: 'My Command', desc: 'Description', shortcut: ['Ctrl', 'M'], icon: '🔥' }
```

### Step 2: Add Handler
Find `executeCommand` function and add:
```javascript
case 'my-command':
    myFunction();
    break;
```

---

## 🔧 Common Tasks

### Fix Broken AI
1. Check API key in `config.js`
2. Verify key at [console.groq.com](https://console.groq.com)
3. Check browser console for errors (F12)

### Clear User Data
Open browser console (F12):
```javascript
localStorage.clear();
location.reload();
```

### Test Locally
Just open `c:\Markdown\index.html` in browser - no server needed!

---

## 🌐 URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://markdownviewer.dev |
| **Pages URL** | https://markdown-viewer-51k.pages.dev |
| **GitHub** | https://github.com/argha5/markdown-view |
| **Cloudflare** | https://dash.cloudflare.com |

---

## 📞 Quick Commands

```powershell
# Deploy to Cloudflare
Copy-Item index.html, script.js, style.css, themes.css, config.js, README.md, LICENSE -Destination dist -Force; npx wrangler pages deploy dist --project-name markdown-viewer

# Push to GitHub
git add .; git commit -m "update"; git push

# Check wrangler login
npx wrangler whoami
```
