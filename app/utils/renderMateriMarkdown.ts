import 'highlight.js/styles/github-dark.css'
import { Marked } from 'marked'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import go from 'highlight.js/lib/languages/go'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import kotlin from 'highlight.js/lib/languages/kotlin'
import markdown from 'highlight.js/lib/languages/markdown'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('c', c)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('css', css)
hljs.registerLanguage('go', go)
hljs.registerLanguage('java', java)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('php', php)
hljs.registerLanguage('python', python)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('yaml', yaml)

const LANG_ALIASES: Record<string, string> = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  jsx: 'javascript',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  yml: 'yaml',
  md: 'markdown',
  html: 'xml',
  htm: 'xml',
  vue: 'xml',
  cs: 'csharp',
  'c++': 'cpp',
  cc: 'cpp',
  hpp: 'cpp',
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function resolveLang(raw?: string | null) {
  if (!raw) return null
  const key = raw.trim().toLowerCase()
  const mapped = LANG_ALIASES[key] ?? key
  return hljs.getLanguage(mapped) ? mapped : null
}

function highlightCode(text: string, lang?: string | null) {
  const resolved = resolveLang(lang || undefined)
  if (resolved) {
    try {
      return hljs.highlight(text, { language: resolved }).value
    } catch {
      /* fall through */
    }
  }
  try {
    return hljs.highlightAuto(text).value
  } catch {
    return escapeHtml(text)
  }
}

const materiMarked = new Marked()

materiMarked.use({
  renderer: {
    code({ text, lang }) {
      const rawLabel = (lang || '').trim() || 'kode'
      const resolved = resolveLang(lang)
      const highlighted = highlightCode(text, lang)
      const safeLabel = escapeHtml(rawLabel)
      const codeClass = resolved ? `hljs language-${escapeHtml(resolved)}` : 'hljs'

      return `<div class="materi-code-block not-prose relative my-4 overflow-hidden rounded-lg border border-gray-600 bg-[#0d1117] shadow-md">
  <div class="flex items-center justify-between gap-2 border-b border-gray-700 bg-gray-900/90 px-3 py-2">
    <span class="font-mono text-xs text-emerald-400/90">${safeLabel}</span>
    <button type="button" data-copy-code class="shrink-0 rounded-md bg-gray-700 px-2.5 py-1 text-[11px] font-medium text-gray-200 transition hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80">Salin</button>
  </div>
  <pre class="m-0 overflow-x-auto border-0 bg-transparent p-4 text-[13px] leading-relaxed"><code class="${codeClass}">${highlighted}</code></pre>
</div>`
    },
  },
})

export function renderMateriMarkdown(src: string): string {
  return materiMarked.parse(src) as string
}
