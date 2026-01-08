/**
 * Markdown Viewer - Main Application
 * markdownviewer.dev
 * 
 * A fast, beautiful Markdown viewer with live preview,
 * syntax highlighting, diagrams, math, and export features.
 */

// ===================================
// Configuration
// ===================================
const CONFIG = {
    STORAGE_KEY: 'markdown_content',
    THEME_KEY: 'markdown_theme',
    TOC_KEY: 'markdown_toc_visible',
    DEBOUNCE_DELAY: 100,
    READING_SPEED: 200 // words per minute
};

// Theme definitions for the theme picker
const THEMES = [
    { id: 'github-light', name: 'GitHub Light', colors: ['#ffffff', '#0969da', '#1f2328'] },
    { id: 'github-dark', name: 'GitHub Dark', colors: ['#0d1117', '#58a6ff', '#e6edf3'] },
    { id: 'notion-light', name: 'Notion Light', colors: ['#ffffff', '#2eaadc', '#37352f'] },
    { id: 'notion-dark', name: 'Notion Dark', colors: ['#191919', '#529cca', '#e6e6e4'] },
    { id: 'obsidian', name: 'Obsidian', colors: ['#1e1e1e', '#7c3aed', '#dcddde'] },
    { id: 'dracula', name: 'Dracula', colors: ['#282a36', '#bd93f9', '#f8f8f2'] },
    { id: 'nord', name: 'Nord', colors: ['#2e3440', '#88c0d0', '#eceff4'] },
    { id: 'solarized-light', name: 'Solarized Light', colors: ['#fdf6e3', '#268bd2', '#657b83'] },
    { id: 'solarized-dark', name: 'Solarized Dark', colors: ['#002b36', '#2aa198', '#839496'] },
    { id: 'one-dark', name: 'One Dark', colors: ['#282c34', '#61afef', '#abb2bf'] },
    { id: 'monokai', name: 'Monokai', colors: ['#272822', '#a6e22e', '#f8f8f2'] },
    { id: 'tokyo-night', name: 'Tokyo Night', colors: ['#1a1b26', '#7aa2f7', '#c0caf5'] },
    { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', colors: ['#1e1e2e', '#cba6f7', '#cdd6f4'] },
    { id: 'catppuccin-latte', name: 'Catppuccin Latte', colors: ['#eff1f5', '#8839ef', '#4c4f69'] },
    { id: 'rose-pine', name: 'Rosé Pine', colors: ['#191724', '#ebbcba', '#e0def4'] },
    { id: 'rose-pine-dawn', name: 'Rosé Pine Dawn', colors: ['#faf4ed', '#d7827e', '#575279'] },
    { id: 'gruvbox-dark', name: 'Gruvbox Dark', colors: ['#282828', '#fabd2f', '#ebdbb2'] },
    { id: 'gruvbox-light', name: 'Gruvbox Light', colors: ['#fbf1c7', '#d79921', '#3c3836'] },
    { id: 'midnight', name: 'Midnight', colors: ['#0a0a0f', '#6366f1', '#e4e4ef'] },
    { id: 'paper', name: 'Paper', colors: ['#f5f5f0', '#4a90d9', '#2d2d2d'] },
    { id: 'ocean', name: 'Ocean', colors: ['#0c1929', '#29b6f6', '#e3f2fd'] },
    { id: 'forest', name: 'Forest', colors: ['#0d1f0d', '#4caf50', '#d4edda'] }
];

// Command palette commands
const COMMANDS = [
    { id: 'bold', title: 'Bold', desc: 'Make text bold', shortcut: ['Ctrl', 'B'], icon: 'B' },
    { id: 'italic', title: 'Italic', desc: 'Make text italic', shortcut: ['Ctrl', 'I'], icon: 'I' },
    { id: 'heading1', title: 'Heading 1', desc: 'Insert heading 1', shortcut: ['Ctrl', '1'], icon: 'H1' },
    { id: 'heading2', title: 'Heading 2', desc: 'Insert heading 2', shortcut: ['Ctrl', '2'], icon: 'H2' },
    { id: 'heading3', title: 'Heading 3', desc: 'Insert heading 3', shortcut: ['Ctrl', '3'], icon: 'H3' },
    { id: 'link', title: 'Insert Link', desc: 'Add a hyperlink', shortcut: ['Ctrl', 'K'], icon: '🔗' },
    { id: 'image', title: 'Insert Image', desc: 'Add an image', shortcut: ['Ctrl', 'Shift', 'I'], icon: '🖼️' },
    { id: 'code', title: 'Inline Code', desc: 'Format as code', shortcut: ['Ctrl', '`'], icon: '</>' },
    { id: 'codeblock', title: 'Code Block', desc: 'Insert code block', shortcut: ['Ctrl', 'Shift', 'K'], icon: '{ }' },
    { id: 'quote', title: 'Blockquote', desc: 'Insert blockquote', shortcut: ['Ctrl', 'Shift', '.'], icon: '"' },
    { id: 'ul', title: 'Bullet List', desc: 'Insert bullet list', shortcut: ['Ctrl', 'Shift', '8'], icon: '•' },
    { id: 'ol', title: 'Numbered List', desc: 'Insert numbered list', shortcut: ['Ctrl', 'Shift', '7'], icon: '1.' },
    { id: 'task', title: 'Task List', desc: 'Insert task list', shortcut: [], icon: '☑' },
    { id: 'table', title: 'Insert Table', desc: 'Add a table', shortcut: [], icon: '▦' },
    { id: 'hr', title: 'Horizontal Rule', desc: 'Insert divider', shortcut: [], icon: '—' },
    { id: 'mermaid', title: 'Mermaid Diagram', desc: 'Insert diagram', shortcut: [], icon: '◇' },
    { id: 'math', title: 'Math (LaTeX)', desc: 'Insert math formula', shortcut: [], icon: '∑' },
    { id: 'export-pdf', title: 'Export as PDF', desc: 'Download PDF file', shortcut: ['Ctrl', 'P'], icon: '📄' },
    { id: 'export-html', title: 'Export as HTML', desc: 'Download HTML file', shortcut: [], icon: '🌐' },
    { id: 'export-md', title: 'Export as Markdown', desc: 'Download .md file', shortcut: ['Ctrl', 'S'], icon: '📝' },
    { id: 'reading-mode', title: 'Reading Mode', desc: 'Distraction-free reading', shortcut: ['F11'], icon: '📖' },
    { id: 'toggle-toc', title: 'Toggle Table of Contents', desc: 'Show/hide TOC', shortcut: [], icon: '📑' },
    { id: 'undo', title: 'Undo', desc: 'Undo last action', shortcut: ['Ctrl', 'Z'], icon: '↩' },
    { id: 'redo', title: 'Redo', desc: 'Redo last action', shortcut: ['Ctrl', 'Shift', 'Z'], icon: '↪' }
];

// Default markdown content
const DEFAULT_MARKDOWN = `# Welcome to Markdown Viewer! 🚀

The **fastest** and most beautiful way to write and preview Markdown online.

---

## ✨ Features

- 📝 **Live Preview** — See changes instantly as you type
- 🎨 **22 Themes** — GitHub, Notion, Obsidian, Dracula, Nord, and more
- 📊 **Mermaid Diagrams** — Flowcharts, sequences, and Gantt charts
- 📐 **LaTeX Math** — Beautiful math equations with KaTeX
- 💻 **Syntax Highlighting** — 190+ programming languages
- 📤 **Export** — PDF, HTML, and Markdown
- ⌨️ **Command Palette** — Press \`Ctrl+K\` for quick actions

---

## Code Example

\`\`\`javascript
function greet(name) {
    console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

---

## LaTeX Math

Inline math: $E = mc^2$

Block math:
$$
\\sum_{i=1}^{n} x_i = \\frac{n(n+1)}{2}
$$

---

## Mermaid Diagram

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
\`\`\`

---

## Custom Syntax Extensions

::center This text is centered::

::right This text is right-aligned::

//pagebreak//

---

## Tables

| Feature | Status |
|---------|--------|
| Live Preview | ✅ |
| Dark Mode | ✅ |
| Export | ✅ |
| Diagrams | ✅ |

---

## Task List

- [x] Write markdown
- [x] Add live preview
- [x] Implement themes
- [ ] Take over the world

---

> "The only way to do great work is to love what you do."
> — Steve Jobs

---

**Start writing!** Your content is automatically saved locally.
`;

// ===================================
// DOM Elements
// ===================================
const elements = {
    markdownInput: document.getElementById('markdownInput'),
    previewContent: document.getElementById('previewContent'),
    wordCount: document.getElementById('wordCount'),
    charCount: document.getElementById('charCount'),
    readingTime: document.getElementById('readingTime'),
    themeMenuBtn: document.getElementById('themeMenuBtn'),
    themeDropdown: document.getElementById('themeDropdown'),
    themeList: document.getElementById('themeList'),
    exportBtn: document.getElementById('exportBtn'),
    exportDropdown: document.getElementById('exportDropdown'),
    tocToggle: document.getElementById('tocToggle'),
    tocSidebar: document.getElementById('tocSidebar'),
    tocContent: document.getElementById('tocContent'),
    tocClose: document.getElementById('tocClose'),
    readingModeBtn: document.getElementById('readingModeBtn'),
    readingModeContainer: document.getElementById('readingModeContainer'),
    readingModeContent: document.getElementById('readingModeContent'),
    readingModeClose: document.getElementById('readingModeClose'),
    commandPaletteBtn: document.getElementById('commandPaletteBtn'),
    commandPaletteOverlay: document.getElementById('commandPaletteOverlay'),
    commandSearch: document.getElementById('commandSearch'),
    commandList: document.getElementById('commandList'),
    floatingToolbar: document.getElementById('floatingToolbar'),
    copyMarkdownBtn: document.getElementById('copyMarkdownBtn'),
    copyHtmlBtn: document.getElementById('copyHtmlBtn'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    mobileViewToggle: document.getElementById('mobileViewToggle'),
    resizeHandle: document.getElementById('resizeHandle')
};

// ===================================
// State
// ===================================
let undoStack = [];
let redoStack = [];
let lastSavedContent = '';
let mermaidCounter = 0;
let selectedCommandIndex = 0;
let filteredCommands = [...COMMANDS];

// ===================================
// Initialize Marked.js
// ===================================
function initMarked() {
    // Use marked.use() for the newer API
    marked.use({
        breaks: true,
        gfm: true,
        mangle: false,
        renderer: {
            code(code, language, escaped) {
                // Handle both old and new API (marked v5+ passes object)
                let codeText = code;
                let lang = language;

                if (typeof code === 'object') {
                    codeText = code.text || code.raw || '';
                    lang = code.lang || '';
                }

                // Handle mermaid diagrams
                if (lang === 'mermaid') {
                    const id = `mermaid-${mermaidCounter++}`;
                    return `<div class="mermaid" id="${id}">${codeText}</div>`;
                }

                // Syntax highlighting
                let highlighted;
                try {
                    if (lang && hljs.getLanguage(lang)) {
                        highlighted = hljs.highlight(codeText, { language: lang }).value;
                    } else {
                        highlighted = hljs.highlightAuto(codeText).value;
                    }
                } catch (e) {
                    highlighted = codeText;
                }

                const langLabel = lang ? `data-language="${lang}"` : '';
                return `<pre ${langLabel}><code class="hljs">${highlighted}</code></pre>`;
            }
        }
    });
}

// ===================================
// Mermaid Initialization
// ===================================
function initMermaid() {
    const isDark = document.documentElement.getAttribute('data-theme')?.includes('dark') ||
        document.documentElement.getAttribute('data-theme') === 'obsidian' ||
        document.documentElement.getAttribute('data-theme') === 'dracula' ||
        document.documentElement.getAttribute('data-theme') === 'nord' ||
        document.documentElement.getAttribute('data-theme') === 'one-dark' ||
        document.documentElement.getAttribute('data-theme') === 'monokai' ||
        document.documentElement.getAttribute('data-theme') === 'tokyo-night' ||
        document.documentElement.getAttribute('data-theme') === 'catppuccin-mocha' ||
        document.documentElement.getAttribute('data-theme') === 'rose-pine' ||
        document.documentElement.getAttribute('data-theme') === 'gruvbox-dark' ||
        document.documentElement.getAttribute('data-theme') === 'midnight' ||
        document.documentElement.getAttribute('data-theme') === 'ocean' ||
        document.documentElement.getAttribute('data-theme') === 'forest';

    mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose'
    });
}

// ===================================
// Custom Syntax Extensions
// ===================================
function preprocessMarkdown(text) {
    // Center text: ::center text::
    text = text.replace(/::center\s+(.+?)::/g, '<div class="text-center">$1</div>');

    // Right align: ::right text::
    text = text.replace(/::right\s+(.+?)::/g, '<div class="text-right">$1</div>');

    // Page break: //pagebreak//
    text = text.replace(/\/\/pagebreak\/\//g, '<div class="page-break"></div>');

    return text;
}

// ===================================
// Markdown Rendering
// ===================================
async function renderMarkdown() {
    const markdown = elements.markdownInput.value;

    if (markdown.trim() === '') {
        elements.previewContent.innerHTML = '<p class="placeholder-text">Your rendered markdown will appear here...</p>';
        updateStats('', 0, 0);
        updateTOC([]);
        return;
    }

    // Preprocess for custom syntax
    const processed = preprocessMarkdown(markdown);

    // Render markdown
    mermaidCounter = 0;
    const html = marked.parse(processed);
    elements.previewContent.innerHTML = html;

    // Render mermaid diagrams
    await renderMermaidDiagrams();

    // Render KaTeX math
    renderMath(elements.previewContent);

    // Update stats
    const words = countWords(markdown);
    const chars = markdown.length;
    const readTime = Math.ceil(words / CONFIG.READING_SPEED);
    updateStats(words, chars, readTime);

    // Update TOC
    const headings = extractHeadings(elements.previewContent);
    updateTOC(headings);

    // Save to localStorage
    saveToLocalStorage();
}

async function renderMermaidDiagrams() {
    const diagrams = elements.previewContent.querySelectorAll('.mermaid');
    for (const diagram of diagrams) {
        try {
            const id = diagram.id;
            const code = diagram.textContent;
            const { svg } = await mermaid.render(id + '-svg', code);
            diagram.innerHTML = svg;
        } catch (error) {
            diagram.innerHTML = `<div style="color: var(--code-text); padding: 1rem;">Mermaid Error: ${error.message}</div>`;
        }
    }
}

function renderMath(container) {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(container, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\[', right: '\\]', display: true },
                { left: '\\(', right: '\\)', display: false }
            ],
            throwOnError: false
        });
    }
}

// ===================================
// Stats
// ===================================
function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function updateStats(words, chars, readTime) {
    elements.wordCount.textContent = `${words.toLocaleString()} words`;
    elements.charCount.textContent = `${chars.toLocaleString()} chars`;
    elements.readingTime.textContent = `${readTime} min read`;
}

// ===================================
// Table of Contents
// ===================================
function extractHeadings(container) {
    const headings = [];
    const elements = container.querySelectorAll('h1, h2, h3, h4, h5, h6');

    elements.forEach((el, index) => {
        const level = parseInt(el.tagName.charAt(1));
        const text = el.textContent;
        const id = `heading-${index}`;
        el.id = id;
        headings.push({ level, text, id });
    });

    return headings;
}

function updateTOC(headings) {
    if (headings.length === 0) {
        elements.tocContent.innerHTML = '<p class="toc-empty">No headings found</p>';
        return;
    }

    const html = headings.map(h => `
        <a class="toc-item toc-h${h.level}" href="#${h.id}" data-target="${h.id}">
            ${h.text}
        </a>
    `).join('');

    elements.tocContent.innerHTML = html;

    // Add click handlers
    elements.tocContent.querySelectorAll('.toc-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(item.dataset.target);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===================================
// Theme Management
// ===================================
function initTheme() {
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY) || 'github-light';
    setTheme(savedTheme);
    buildThemeList();
}

function setTheme(themeId) {
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem(CONFIG.THEME_KEY, themeId);

    // Update theme list active state
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === themeId);
    });

    // Re-initialize mermaid with new theme
    initMermaid();

    // Re-render diagrams if any
    if (elements.markdownInput.value.includes('```mermaid')) {
        renderMarkdown();
    }
}

function buildThemeList() {
    elements.themeList.innerHTML = THEMES.map(theme => `
        <div class="theme-option" data-theme="${theme.id}">
            <div class="theme-preview">
                ${theme.colors.map(c => `<div class="theme-preview-color" style="background: ${c}"></div>`).join('')}
            </div>
            <span class="theme-option-name">${theme.name}</span>
        </div>
    `).join('');

    // Add click handlers
    elements.themeList.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
            setTheme(opt.dataset.theme);
            elements.themeDropdown.classList.remove('show');
            showToast(`Theme: ${THEMES.find(t => t.id === opt.dataset.theme).name}`);
        });
    });
}

// ===================================
// Local Storage
// ===================================
function saveToLocalStorage() {
    const content = elements.markdownInput.value;
    if (content !== lastSavedContent) {
        localStorage.setItem(CONFIG.STORAGE_KEY, content);
        lastSavedContent = content;
    }
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
    elements.markdownInput.value = saved !== null && saved !== '' ? saved : DEFAULT_MARKDOWN;
    lastSavedContent = elements.markdownInput.value;

    // Load TOC state
    const tocVisible = localStorage.getItem(CONFIG.TOC_KEY) === 'true';
    elements.tocSidebar.classList.toggle('show', tocVisible);
}

// ===================================
// Undo/Redo System
// ===================================
function saveUndoState() {
    undoStack.push(elements.markdownInput.value);
    if (undoStack.length > 100) undoStack.shift();
    redoStack = [];
}

function undo() {
    if (undoStack.length > 0) {
        redoStack.push(elements.markdownInput.value);
        elements.markdownInput.value = undoStack.pop();
        renderMarkdown();
        showToast('Undo');
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push(elements.markdownInput.value);
        elements.markdownInput.value = redoStack.pop();
        renderMarkdown();
        showToast('Redo');
    }
}

// ===================================
// Text Formatting Actions
// ===================================
function insertText(before, after = '', placeholder = '') {
    const textarea = elements.markdownInput;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const text = selected || placeholder;

    saveUndoState();

    textarea.value =
        textarea.value.substring(0, start) +
        before + text + after +
        textarea.value.substring(end);

    // Position cursor
    const cursorPos = start + before.length + (selected ? text.length : 0);
    textarea.setSelectionRange(
        selected ? start + before.length : cursorPos,
        selected ? start + before.length + text.length : cursorPos
    );

    textarea.focus();
    renderMarkdown();
}

function insertAtLineStart(prefix) {
    const textarea = elements.markdownInput;
    const start = textarea.selectionStart;
    const value = textarea.value;

    // Find start of line
    let lineStart = start;
    while (lineStart > 0 && value[lineStart - 1] !== '\n') {
        lineStart--;
    }

    saveUndoState();

    textarea.value = value.substring(0, lineStart) + prefix + value.substring(lineStart);
    textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    textarea.focus();
    renderMarkdown();
}

const FORMATTING_ACTIONS = {
    bold: () => insertText('**', '**', 'bold text'),
    italic: () => insertText('*', '*', 'italic text'),
    strikethrough: () => insertText('~~', '~~', 'strikethrough'),
    h1: () => insertAtLineStart('# '),
    h2: () => insertAtLineStart('## '),
    h3: () => insertAtLineStart('### '),
    ul: () => insertAtLineStart('- '),
    ol: () => insertAtLineStart('1. '),
    task: () => insertAtLineStart('- [ ] '),
    link: () => insertText('[', '](url)', 'link text'),
    image: () => insertText('![', '](url)', 'alt text'),
    code: () => insertText('`', '`', 'code'),
    codeblock: () => insertText('```javascript\n', '\n```', 'code here'),
    quote: () => insertAtLineStart('> '),
    hr: () => insertText('\n---\n', '', ''),
    table: () => insertText('\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', '', ''),
    mermaid: () => insertText('```mermaid\ngraph TD\n    A[Start] --> B[End]\n```\n', '', ''),
    math: () => insertText('$$\n', '\n$$', 'E = mc^2'),
    undo: () => undo(),
    redo: () => redo()
};

// ===================================
// Export Functions
// ===================================
function exportMarkdown() {
    const content = elements.markdownInput.value;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    downloadBlob(blob, 'document.md');
    showToast('Downloaded as Markdown');
}

function exportHTML() {
    const content = elements.previewContent.innerHTML;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.7;
            color: #1f2328;
            background: #ffffff;
        }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 600; }
        h1 { font-size: 2rem; border-bottom: 2px solid #d0d7de; padding-bottom: 0.3em; }
        h2 { font-size: 1.5rem; border-bottom: 1px solid #d0d7de; padding-bottom: 0.2em; }
        code { font-family: 'JetBrains Mono', monospace; background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 4px; }
        pre { background: #24292e; color: #e1e4e8; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        pre code { background: transparent; padding: 0; }
        blockquote { border-left: 4px solid #0969da; background: #f6f8fa; padding: 0.75em 1em; margin: 1em 0; border-radius: 0 8px 8px 0; }
        table { width: 100%; border-collapse: collapse; margin: 1em 0; }
        th, td { padding: 0.75rem; border: 1px solid #d0d7de; text-align: left; }
        th { background: #f6f8fa; }
        a { color: #0969da; }
        img { max-width: 100%; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .mermaid { text-align: center; padding: 1rem; background: #f6f8fa; border-radius: 8px; }
        @media print { body { max-width: none; } .page-break { page-break-after: always; } }
    </style>
</head>
<body>
${content}
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"><\/script>
<script>mermaid.initialize({ startOnLoad: true });<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    downloadBlob(blob, 'document.html');
    showToast('Downloaded as HTML');
}

async function exportPDF() {
    showToast('Generating PDF...');

    if (typeof html2pdf === 'undefined') {
        showToast('PDF library not loaded', 'error');
        return;
    }

    // Create a clone for PDF generation
    const clone = elements.previewContent.cloneNode(true);
    clone.style.padding = '0';

    const opt = {
        margin: [15, 15, 15, 15],
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        await html2pdf().set(opt).from(clone).save();
        showToast('Downloaded as PDF');
    } catch (error) {
        showToast('PDF export failed', 'error');
        console.error('PDF export error:', error);
    }
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// ===================================
// Command Palette
// ===================================
function openCommandPalette() {
    elements.commandPaletteOverlay.classList.add('show');
    elements.commandSearch.value = '';
    filterCommands('');
    selectedCommandIndex = 0;
    updateCommandSelection();
    setTimeout(() => elements.commandSearch.focus(), 50);
}

function closeCommandPalette() {
    elements.commandPaletteOverlay.classList.remove('show');
    elements.markdownInput.focus();
}

function filterCommands(query) {
    const q = query.toLowerCase();
    filteredCommands = COMMANDS.filter(cmd =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.desc.toLowerCase().includes(q)
    );
    renderCommandList();
}

function renderCommandList() {
    elements.commandList.innerHTML = filteredCommands.map((cmd, i) => `
        <div class="command-item ${i === selectedCommandIndex ? 'selected' : ''}" data-command="${cmd.id}">
            <div class="command-item-icon">${cmd.icon}</div>
            <div class="command-item-content">
                <div class="command-item-title">${cmd.title}</div>
                <div class="command-item-desc">${cmd.desc}</div>
            </div>
            ${cmd.shortcut.length ? `
                <div class="command-item-shortcut">
                    ${cmd.shortcut.map(k => `<kbd>${k}</kbd>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');

    // Add click handlers
    elements.commandList.querySelectorAll('.command-item').forEach((item, i) => {
        item.addEventListener('click', () => executeCommand(filteredCommands[i].id));
        item.addEventListener('mouseenter', () => {
            selectedCommandIndex = i;
            updateCommandSelection();
        });
    });
}

function updateCommandSelection() {
    elements.commandList.querySelectorAll('.command-item').forEach((item, i) => {
        item.classList.toggle('selected', i === selectedCommandIndex);
    });

    // Scroll into view
    const selected = elements.commandList.querySelector('.command-item.selected');
    if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
    }
}

function executeCommand(commandId) {
    closeCommandPalette();

    switch (commandId) {
        case 'bold': FORMATTING_ACTIONS.bold(); break;
        case 'italic': FORMATTING_ACTIONS.italic(); break;
        case 'heading1': FORMATTING_ACTIONS.h1(); break;
        case 'heading2': FORMATTING_ACTIONS.h2(); break;
        case 'heading3': FORMATTING_ACTIONS.h3(); break;
        case 'link': FORMATTING_ACTIONS.link(); break;
        case 'image': FORMATTING_ACTIONS.image(); break;
        case 'code': FORMATTING_ACTIONS.code(); break;
        case 'codeblock': FORMATTING_ACTIONS.codeblock(); break;
        case 'quote': FORMATTING_ACTIONS.quote(); break;
        case 'ul': FORMATTING_ACTIONS.ul(); break;
        case 'ol': FORMATTING_ACTIONS.ol(); break;
        case 'task': FORMATTING_ACTIONS.task(); break;
        case 'table': FORMATTING_ACTIONS.table(); break;
        case 'hr': FORMATTING_ACTIONS.hr(); break;
        case 'mermaid': FORMATTING_ACTIONS.mermaid(); break;
        case 'math': FORMATTING_ACTIONS.math(); break;
        case 'export-pdf': exportPDF(); break;
        case 'export-html': exportHTML(); break;
        case 'export-md': exportMarkdown(); break;
        case 'reading-mode': openReadingMode(); break;
        case 'toggle-toc': toggleTOC(); break;
        case 'undo': undo(); break;
        case 'redo': redo(); break;
    }
}

// ===================================
// Reading Mode
// ===================================
function openReadingMode() {
    elements.readingModeContent.innerHTML = elements.previewContent.innerHTML;
    renderMath(elements.readingModeContent);
    elements.readingModeContainer.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeReadingMode() {
    elements.readingModeContainer.classList.remove('show');
    document.body.style.overflow = '';
}

// ===================================
// TOC
// ===================================
function toggleTOC() {
    const visible = elements.tocSidebar.classList.toggle('show');
    localStorage.setItem(CONFIG.TOC_KEY, visible);
}

// ===================================
// Sync Scroll
// ===================================
function syncScroll() {
    const textarea = elements.markdownInput;
    const preview = elements.previewContent;

    const percentage = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
    preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
}

// ===================================
// Toast Notification
// ===================================
let toastTimeout;

function showToast(message, type = 'success') {
    clearTimeout(toastTimeout);

    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('error');
    if (type === 'error') elements.toast.classList.add('error');
    elements.toast.classList.add('show');

    toastTimeout = setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2500);
}

// ===================================
// Copy Functions
// ===================================
async function copyToClipboard(text, successMessage) {
    try {
        await navigator.clipboard.writeText(text);
        showToast(successMessage);
    } catch {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(successMessage);
    }
}

// ===================================
// Resize Handle
// ===================================
function initResizeHandle() {
    let isResizing = false;
    let startX;
    let startWidth;

    const editorPanel = document.querySelector('.editor-panel');
    const previewPanel = document.querySelector('.preview-panel');

    elements.resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = editorPanel.offsetWidth;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const diff = e.clientX - startX;
        const newWidth = startWidth + diff;
        const containerWidth = editorPanel.parentElement.offsetWidth;

        const minWidth = 200;
        const maxWidth = containerWidth - 200;

        if (newWidth >= minWidth && newWidth <= maxWidth) {
            editorPanel.style.flex = 'none';
            editorPanel.style.width = `${newWidth}px`;
            previewPanel.style.flex = '1';
        }
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
}

// ===================================
// Mobile View Toggle
// ===================================
function initMobileView() {
    const editorPanel = document.querySelector('.editor-panel');
    const previewPanel = document.querySelector('.preview-panel');

    // Set initial state
    editorPanel.classList.add('mobile-active');

    elements.mobileViewToggle.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-btn')) {
            const view = e.target.dataset.view;

            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === view);
            });

            editorPanel.classList.toggle('mobile-active', view === 'editor');
            previewPanel.classList.toggle('mobile-active', view === 'preview');
        }
    });
}

// ===================================
// Keyboard Shortcuts
// ===================================
function handleKeyboardShortcuts(e) {
    const isMod = e.ctrlKey || e.metaKey;

    // Command palette
    if (isMod && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
        return;
    }

    // Command palette navigation
    if (elements.commandPaletteOverlay.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeCommandPalette();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedCommandIndex = Math.min(selectedCommandIndex + 1, filteredCommands.length - 1);
            updateCommandSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedCommandIndex = Math.max(selectedCommandIndex - 1, 0);
            updateCommandSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedCommandIndex]) {
                executeCommand(filteredCommands[selectedCommandIndex].id);
            }
        }
        return;
    }

    // Reading mode
    if (e.key === 'F11') {
        e.preventDefault();
        if (elements.readingModeContainer.classList.contains('show')) {
            closeReadingMode();
        } else {
            openReadingMode();
        }
        return;
    }

    if (e.key === 'Escape') {
        if (elements.readingModeContainer.classList.contains('show')) {
            closeReadingMode();
        }
        return;
    }

    // Save
    if (isMod && e.key === 's') {
        e.preventDefault();
        saveToLocalStorage();
        showToast('Saved!');
        return;
    }

    // Export PDF
    if (isMod && e.key === 'p') {
        e.preventDefault();
        exportPDF();
        return;
    }

    // Formatting shortcuts (when in editor)
    if (document.activeElement === elements.markdownInput) {
        if (isMod && e.key === 'b') {
            e.preventDefault();
            FORMATTING_ACTIONS.bold();
        } else if (isMod && e.key === 'i') {
            e.preventDefault();
            FORMATTING_ACTIONS.italic();
        } else if (isMod && e.key === '1') {
            e.preventDefault();
            FORMATTING_ACTIONS.h1();
        } else if (isMod && e.key === '2') {
            e.preventDefault();
            FORMATTING_ACTIONS.h2();
        } else if (isMod && e.key === '3') {
            e.preventDefault();
            FORMATTING_ACTIONS.h3();
        } else if (isMod && e.key === '`') {
            e.preventDefault();
            FORMATTING_ACTIONS.code();
        } else if (isMod && e.shiftKey && e.key === 'K') {
            e.preventDefault();
            FORMATTING_ACTIONS.codeblock();
        } else if (isMod && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        } else if (isMod && e.shiftKey && e.key === 'Z') {
            e.preventDefault();
            redo();
        }
    }
}

// Tab key handler
function handleTabKey(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = elements.markdownInput.selectionStart;
        const end = elements.markdownInput.selectionEnd;

        saveUndoState();

        elements.markdownInput.value =
            elements.markdownInput.value.substring(0, start) +
            '    ' +
            elements.markdownInput.value.substring(end);

        elements.markdownInput.selectionStart = elements.markdownInput.selectionEnd = start + 4;
        renderMarkdown();
    }
}

// ===================================
// Event Listeners
// ===================================
function initEventListeners() {
    // Debounced render
    let renderTimeout;
    elements.markdownInput.addEventListener('input', () => {
        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(renderMarkdown, CONFIG.DEBOUNCE_DELAY);
    });

    // Tab key
    elements.markdownInput.addEventListener('keydown', handleTabKey);

    // Sync scroll
    let scrollTimeout;
    elements.markdownInput.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(syncScroll, 50);
    });

    // Theme dropdown
    elements.themeMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.themeDropdown.classList.toggle('show');
        elements.exportDropdown.classList.remove('show');
    });

    // Export dropdown
    elements.exportBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.exportDropdown.classList.toggle('show');
        elements.themeDropdown.classList.remove('show');
    });

    // Export options
    document.querySelectorAll('.export-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const format = opt.dataset.format;
            elements.exportDropdown.classList.remove('show');

            switch (format) {
                case 'md': exportMarkdown(); break;
                case 'html': exportHTML(); break;
                case 'pdf': exportPDF(); break;
            }
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        elements.themeDropdown.classList.remove('show');
        elements.exportDropdown.classList.remove('show');
    });

    // TOC toggle
    elements.tocToggle.addEventListener('click', toggleTOC);
    elements.tocClose.addEventListener('click', toggleTOC);

    // Reading mode
    elements.readingModeBtn.addEventListener('click', openReadingMode);
    elements.readingModeClose.addEventListener('click', closeReadingMode);

    // Command palette
    elements.commandPaletteBtn.addEventListener('click', openCommandPalette);
    elements.commandPaletteOverlay.addEventListener('click', (e) => {
        if (e.target === elements.commandPaletteOverlay) {
            closeCommandPalette();
        }
    });
    elements.commandSearch.addEventListener('input', (e) => {
        filterCommands(e.target.value);
        selectedCommandIndex = 0;
        updateCommandSelection();
    });

    // Floating toolbar
    elements.floatingToolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            if (FORMATTING_ACTIONS[action]) {
                FORMATTING_ACTIONS[action]();
            }
        });
    });

    // Copy buttons
    elements.copyMarkdownBtn.addEventListener('click', () => {
        copyToClipboard(elements.markdownInput.value, 'Markdown copied!');
    });

    elements.copyHtmlBtn.addEventListener('click', () => {
        copyToClipboard(elements.previewContent.innerHTML, 'HTML copied!');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Drag and drop files
    elements.markdownInput.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.markdownInput.style.opacity = '0.7';
    });

    elements.markdownInput.addEventListener('dragleave', () => {
        elements.markdownInput.style.opacity = '1';
    });

    elements.markdownInput.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.markdownInput.style.opacity = '1';

        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown') || file.type === 'text/plain')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                saveUndoState();
                elements.markdownInput.value = event.target.result;
                renderMarkdown();
                showToast(`Loaded: ${file.name}`);
            };
            reader.readAsText(file);
        }
    });
}

// ===================================
// PHASE 2: AI Assistant (Groq API)
// ===================================
const GROQ_API_KEY_STORAGE = 'groq_api_key';
// Try: 1) localStorage, 2) config.js (gitignored), 3) empty (will prompt)
let GROQ_API_KEY = localStorage.getItem(GROQ_API_KEY_STORAGE) ||
    (typeof CONFIG_API_KEY !== 'undefined' ? CONFIG_API_KEY : '');
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

function setGroqApiKey() {
    const key = prompt('Enter your Groq API Key (get one free at console.groq.com):');
    if (key && key.trim()) {
        GROQ_API_KEY = key.trim();
        localStorage.setItem(GROQ_API_KEY_STORAGE, GROQ_API_KEY);
        showToast('API Key saved!');
        return true;
    }
    return false;
}

const aiElements = {
    sidebar: document.getElementById('aiSidebar'),
    toggle: document.getElementById('aiToggle'),
    close: document.getElementById('aiClose'),
    messages: document.getElementById('aiMessages'),
    input: document.getElementById('aiInput'),
    sendBtn: document.getElementById('aiSendBtn')
};

let aiConversation = [];

function toggleAISidebar() {
    aiElements.sidebar.classList.toggle('show');
    // Close history sidebar if open
    document.getElementById('historySidebar').classList.remove('show');
}

function addAIMessage(content, role = 'assistant') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${role}`;
    messageDiv.innerHTML = `<div class="ai-message-content">${content}</div>`;
    aiElements.messages.appendChild(messageDiv);
    aiElements.messages.scrollTop = aiElements.messages.scrollHeight;
}

function showAILoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-message ai-message-assistant ai-loading';
    loadingDiv.innerHTML = `<div class="ai-message-loading"><span></span><span></span><span></span></div>`;
    loadingDiv.id = 'ai-loading';
    aiElements.messages.appendChild(loadingDiv);
    aiElements.messages.scrollTop = aiElements.messages.scrollHeight;
}

function hideAILoading() {
    const loading = document.getElementById('ai-loading');
    if (loading) loading.remove();
}

async function callGroqAPI(messages) {
    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: messages,
                max_tokens: 2048,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Groq API error:', error);
        throw error;
    }
}

async function sendAIMessage() {
    const userMessage = aiElements.input.value.trim();
    if (!userMessage) return;

    // Check for API key
    if (!GROQ_API_KEY) {
        if (!setGroqApiKey()) {
            addAIMessage('⚠️ Please set your Groq API key to use the AI assistant. Click the message to try again.', 'assistant');
            return;
        }
    }

    // Add user message
    addAIMessage(userMessage, 'user');
    aiElements.input.value = '';

    // Prepare conversation
    aiConversation.push({ role: 'user', content: userMessage });

    // Show loading
    showAILoading();
    aiElements.sendBtn.disabled = true;

    try {
        const systemPrompt = {
            role: 'system',
            content: `You are a specialized Markdown Writing Assistant for markdownviewer.dev. Your ONLY purpose is to help users write and edit their markdown documents.

## YOUR CAPABILITIES:
- Help write and improve markdown content
- Fix grammar, spelling, and clarity issues
- Suggest better formatting
- Summarize or expand text
- Generate content ideas

## STRICT RULES:
1. ONLY answer questions about the user's markdown document, writing, editing, or markdown syntax
2. If asked unrelated questions (math, coding puzzles, history, general knowledge), politely say "I can only help with your markdown document" and suggest a document-related task
3. Keep responses SHORT (2-4 sentences)

## CRITICAL - RESPONSE FORMAT:
- Write in PLAIN TEXT only
- Do NOT use code blocks or markdown headers
- Put EACH suggestion on its OWN LINE with a number (1. 2. 3.)
- Use "→" arrows for changes: 'old' → 'new'
- Add a blank line between each numbered point

EXAMPLE RESPONSE:
"Here are my suggestions:

1. Change 'Stuff' → 'Getting Started' for a clearer heading

2. Add a blank line before your bullet list

3. Fix typo: 'teh' → 'the'"

EXAMPLE BAD RESPONSE (DO NOT DO THIS):
\`\`\`markdown
# Getting Started
\`\`\`

## USER'S CURRENT DOCUMENT:
"""\n${elements.markdownInput.value.substring(0, 2000)}${elements.markdownInput.value.length > 2000 ? '\n...(truncated)' : ''}\n"""

Remember: Plain text only! Be friendly and brief.`
        };

        const response = await callGroqAPI([systemPrompt, ...aiConversation.slice(-10)]);

        hideAILoading();
        addAIMessage(response, 'assistant');
        aiConversation.push({ role: 'assistant', content: response });

    } catch (error) {
        hideAILoading();
        addAIMessage(`❌ Error: ${error.message}. Please try again.`, 'assistant');
    }

    aiElements.sendBtn.disabled = false;
}

async function handleAIAction(action) {
    // Check for API key
    if (!GROQ_API_KEY) {
        if (!setGroqApiKey()) {
            showToast('API key required for AI features', 'error');
            return;
        }
    }

    const selectedText = elements.markdownInput.value.substring(
        elements.markdownInput.selectionStart,
        elements.markdownInput.selectionEnd
    );

    const fullText = elements.markdownInput.value;

    let prompt = '';

    switch (action) {
        case 'grammar':
            prompt = selectedText
                ? `Check the grammar and clarity of this text and provide corrections:\n\n"${selectedText}"`
                : `Check the grammar and clarity of this markdown document and list any issues:\n\n${fullText.substring(0, 3000)}`;
            break;
        case 'rewrite':
            if (!selectedText) {
                showToast('Please select text to rewrite', 'error');
                return;
            }
            prompt = `Rewrite this text to be clearer and more professional:\n\n"${selectedText}"`;
            break;
        case 'summarize':
            prompt = `Summarize this markdown document in 3-5 bullet points:\n\n${fullText.substring(0, 4000)}`;
            break;
        case 'expand':
            if (!selectedText) {
                showToast('Please select text to expand', 'error');
                return;
            }
            prompt = `Expand and elaborate on this text with more details:\n\n"${selectedText}"`;
            break;
        case 'format':
            prompt = `Review this markdown and suggest formatting improvements (headings, lists, code blocks, etc.):\n\n${fullText.substring(0, 3000)}`;
            break;
        case 'generate':
            prompt = `Based on this document, suggest what content could be added next:\n\n${fullText.substring(0, 2000)}`;
            break;
        default:
            return;
    }

    // Open sidebar if not open
    if (!aiElements.sidebar.classList.contains('show')) {
        toggleAISidebar();
    }

    // Add user message
    addAIMessage(`[${action.toUpperCase()}] ${prompt.substring(0, 100)}...`, 'user');

    showAILoading();

    try {
        const actionSystemPrompt = `You are a Markdown Writing Assistant. Help users improve their documents.

CRITICAL RULES:
1. Write in PLAIN TEXT only
2. Do NOT use code blocks or markdown headers
3. Put EACH point on its OWN LINE with numbers (1. 2. 3.)
4. Use "→" for changes: 'old' → 'new'
5. Add blank line between numbered points

EXAMPLE:
"Here are my suggestions:

1. Your heading 'Stuff' → 'Getting Started' would be clearer

2. Add a blank line before your list

3. Fix: 'their' → 'there'"

Be friendly!`;

        const response = await callGroqAPI([
            { role: 'system', content: actionSystemPrompt },
            { role: 'user', content: prompt }
        ]);

        hideAILoading();
        addAIMessage(response, 'assistant');

    } catch (error) {
        hideAILoading();
        addAIMessage(`❌ Error: ${error.message}`, 'assistant');
    }
}

function initAI() {
    if (!aiElements.toggle) return;

    aiElements.toggle.addEventListener('click', toggleAISidebar);
    aiElements.close.addEventListener('click', toggleAISidebar);

    aiElements.sendBtn.addEventListener('click', sendAIMessage);
    aiElements.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendAIMessage();
        }
    });

    // AI action buttons
    document.querySelectorAll('.ai-action-btn').forEach(btn => {
        btn.addEventListener('click', () => handleAIAction(btn.dataset.action));
    });
}

// ===================================
// PHASE 2: Version History
// ===================================
const HISTORY_KEY = 'markdown_history';
const MAX_VERSIONS = 20;

const historyElements = {
    sidebar: document.getElementById('historySidebar'),
    toggle: document.getElementById('historyToggle'),
    close: document.getElementById('historyClose'),
    list: document.getElementById('historyList'),
    saveBtn: document.getElementById('saveVersionBtn'),
    clearBtn: document.getElementById('clearHistoryBtn')
};

function toggleHistorySidebar() {
    historyElements.sidebar.classList.toggle('show');
    // Close AI sidebar if open
    document.getElementById('aiSidebar').classList.remove('show');
    renderHistoryList();
}

function getVersionHistory() {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveVersionHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function saveVersion() {
    const content = elements.markdownInput.value;
    if (!content.trim()) {
        showToast('Nothing to save', 'error');
        return;
    }

    const history = getVersionHistory();
    const version = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        content: content,
        preview: content.substring(0, 100),
        wordCount: countWords(content)
    };

    history.unshift(version);

    // Keep only MAX_VERSIONS
    if (history.length > MAX_VERSIONS) {
        history.pop();
    }

    saveVersionHistory(history);
    renderHistoryList();
    showToast('Version saved!');
}

function restoreVersion(id) {
    const history = getVersionHistory();
    const version = history.find(v => v.id === id);

    if (version) {
        saveUndoState();
        elements.markdownInput.value = version.content;
        renderMarkdown();
        showToast('Version restored!');
    }
}

function deleteVersion(id) {
    let history = getVersionHistory();
    history = history.filter(v => v.id !== id);
    saveVersionHistory(history);
    renderHistoryList();
    showToast('Version deleted');
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all saved versions?')) {
        localStorage.removeItem(HISTORY_KEY);
        renderHistoryList();
        showToast('History cleared');
    }
}

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;

    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderHistoryList() {
    const history = getVersionHistory();

    if (history.length === 0) {
        historyElements.list.innerHTML = '<p class="history-empty">No saved versions yet.<br>Click "Save Version" to create a snapshot.</p>';
        return;
    }

    historyElements.list.innerHTML = history.map(version => `
        <div class="history-item" data-id="${version.id}">
            <div class="history-item-header">
                <span class="history-item-time">${formatTimestamp(version.timestamp)}</span>
                <div class="history-item-actions">
                    <button class="history-item-btn restore-btn" title="Restore this version">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                            <path d="M3 3v5h5"/>
                        </svg>
                    </button>
                    <button class="history-item-btn delete-btn" title="Delete this version">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="history-item-preview">${version.preview.replace(/</g, '&lt;')}...</div>
            <div class="history-item-stats">${version.wordCount} words</div>
        </div>
    `).join('');

    // Add event listeners
    historyElements.list.querySelectorAll('.history-item').forEach(item => {
        const id = parseInt(item.dataset.id);

        item.querySelector('.restore-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            restoreVersion(id);
        });

        item.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteVersion(id);
        });
    });
}

function initHistory() {
    if (!historyElements.toggle) return;

    historyElements.toggle.addEventListener('click', toggleHistorySidebar);
    historyElements.close.addEventListener('click', toggleHistorySidebar);
    historyElements.saveBtn.addEventListener('click', saveVersion);
    historyElements.clearBtn.addEventListener('click', clearHistory);
}

// ===================================
// PHASE 2: Find & Replace
// ===================================
const findElements = {
    bar: document.getElementById('findReplaceBar'),
    findInput: document.getElementById('findInput'),
    replaceInput: document.getElementById('replaceInput'),
    findCount: document.getElementById('findCount'),
    findPrevBtn: document.getElementById('findPrevBtn'),
    findNextBtn: document.getElementById('findNextBtn'),
    replaceBtn: document.getElementById('replaceBtn'),
    replaceAllBtn: document.getElementById('replaceAllBtn'),
    closeBtn: document.getElementById('findCloseBtn')
};

let findMatches = [];
let currentMatchIndex = 0;

function toggleFindReplace() {
    findElements.bar.classList.toggle('show');
    if (findElements.bar.classList.contains('show')) {
        findElements.findInput.focus();
        // Copy selected text to find input
        const selected = elements.markdownInput.value.substring(
            elements.markdownInput.selectionStart,
            elements.markdownInput.selectionEnd
        );
        if (selected) {
            findElements.findInput.value = selected;
            performFind();
        }
    }
}

function performFind() {
    const query = findElements.findInput.value;
    const text = elements.markdownInput.value;

    findMatches = [];
    currentMatchIndex = 0;

    if (!query) {
        findElements.findCount.textContent = '0 results';
        return;
    }

    let index = 0;
    while ((index = text.toLowerCase().indexOf(query.toLowerCase(), index)) !== -1) {
        findMatches.push(index);
        index += query.length;
    }

    findElements.findCount.textContent = `${findMatches.length} results`;

    if (findMatches.length > 0) {
        highlightMatch(0);
    }
}

function highlightMatch(index) {
    if (findMatches.length === 0) return;

    currentMatchIndex = index;
    const position = findMatches[index];
    const query = findElements.findInput.value;

    elements.markdownInput.focus();
    elements.markdownInput.setSelectionRange(position, position + query.length);

    findElements.findCount.textContent = `${index + 1}/${findMatches.length}`;
}

function findNext() {
    if (findMatches.length === 0) return;
    const nextIndex = (currentMatchIndex + 1) % findMatches.length;
    highlightMatch(nextIndex);
}

function findPrev() {
    if (findMatches.length === 0) return;
    const prevIndex = (currentMatchIndex - 1 + findMatches.length) % findMatches.length;
    highlightMatch(prevIndex);
}

function replaceOne() {
    if (findMatches.length === 0) return;

    const query = findElements.findInput.value;
    const replacement = findElements.replaceInput.value;

    saveUndoState();

    const text = elements.markdownInput.value;
    const position = findMatches[currentMatchIndex];

    elements.markdownInput.value =
        text.substring(0, position) +
        replacement +
        text.substring(position + query.length);

    renderMarkdown();
    performFind();
    showToast('Replaced 1 match');
}

function replaceAll() {
    const query = findElements.findInput.value;
    const replacement = findElements.replaceInput.value;

    if (!query || findMatches.length === 0) return;

    saveUndoState();

    const count = findMatches.length;
    elements.markdownInput.value = elements.markdownInput.value.split(query).join(replacement);

    renderMarkdown();
    performFind();
    showToast(`Replaced ${count} matches`);
}

function initFindReplace() {
    if (!findElements.bar) return;

    findElements.findInput.addEventListener('input', performFind);
    findElements.findNextBtn.addEventListener('click', findNext);
    findElements.findPrevBtn.addEventListener('click', findPrev);
    findElements.replaceBtn.addEventListener('click', replaceOne);
    findElements.replaceAllBtn.addEventListener('click', replaceAll);
    findElements.closeBtn.addEventListener('click', toggleFindReplace);

    findElements.findInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.shiftKey) findPrev();
            else findNext();
        }
        if (e.key === 'Escape') toggleFindReplace();
    });
}

// ===================================
// PHASE 2: Share Document
// ===================================
const shareElements = {
    overlay: document.getElementById('shareModalOverlay'),
    close: document.getElementById('shareClose'),
    link: document.getElementById('shareLink'),
    copyBtn: document.getElementById('copyShareLink')
};

function openShareModal() {
    const content = elements.markdownInput.value;
    const encoded = btoa(unescape(encodeURIComponent(content)));
    const url = `${window.location.origin}${window.location.pathname}?doc=${encoded}`;

    shareElements.link.value = url;
    shareElements.overlay.classList.add('show');
}

function closeShareModal() {
    shareElements.overlay.classList.remove('show');
}

function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('doc');

    if (encoded) {
        try {
            const content = decodeURIComponent(escape(atob(encoded)));
            elements.markdownInput.value = content;
            renderMarkdown();
            showToast('Document loaded from URL');

            // Clear URL params
            window.history.replaceState({}, '', window.location.pathname);
        } catch (error) {
            console.error('Failed to load document from URL:', error);
        }
    }
}

function initShare() {
    if (!shareElements.overlay) return;

    shareElements.close.addEventListener('click', closeShareModal);
    shareElements.overlay.addEventListener('click', (e) => {
        if (e.target === shareElements.overlay) closeShareModal();
    });

    shareElements.copyBtn.addEventListener('click', () => {
        shareElements.link.select();
        navigator.clipboard.writeText(shareElements.link.value);
        showToast('Share link copied!');
    });
}

// ===================================
// Update keyboard shortcuts for Phase 2
// ===================================
function initPhase2Shortcuts() {
    document.addEventListener('keydown', (e) => {
        const isMod = e.ctrlKey || e.metaKey;

        // Find & Replace: Ctrl+F
        if (isMod && e.key === 'f') {
            e.preventDefault();
            toggleFindReplace();
        }

        // Find Next: F3 or Ctrl+G
        if (e.key === 'F3' || (isMod && e.key === 'g')) {
            e.preventDefault();
            if (findElements.bar.classList.contains('show')) {
                if (e.shiftKey) findPrev();
                else findNext();
            }
        }
    });
}

// Add share command to COMMANDS array
COMMANDS.push(
    { id: 'share', title: 'Share Document', desc: 'Generate shareable link', shortcut: [], icon: '🔗' },
    { id: 'find-replace', title: 'Find & Replace', desc: 'Search and replace text', shortcut: ['Ctrl', 'F'], icon: '🔍' },
    { id: 'save-version', title: 'Save Version', desc: 'Save current version to history', shortcut: [], icon: '💾' }
);

// Update executeCommand for new commands
const originalExecuteCommand = executeCommand;
executeCommand = function (commandId) {
    switch (commandId) {
        case 'share': openShareModal(); return;
        case 'find-replace': toggleFindReplace(); return;
        case 'save-version': saveVersion(); return;
        default: originalExecuteCommand(commandId);
    }
};

// ===================================
// Initialize Application
// ===================================
function init() {
    initMarked();
    initMermaid();
    initTheme();
    loadFromLocalStorage();
    initEventListeners();
    initResizeHandle();
    initMobileView();

    // Phase 2 initializations
    initAI();
    initHistory();
    initFindReplace();
    initShare();
    initPhase2Shortcuts();
    loadFromURL();

    // Initial render
    renderMarkdown();

    // Focus editor
    elements.markdownInput.focus();

    console.log('📝 Markdown Viewer initialized (Phase 2)');
}

// Start the app
init();
