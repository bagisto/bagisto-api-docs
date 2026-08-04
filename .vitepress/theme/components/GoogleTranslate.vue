<template>
  <div ref="root" class="translate-wrap notranslate" translate="no">
    <button
      class="translate-trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :title="`Language: ${currentLabel}`"
      :aria-label="`Language: ${currentLabel}`"
      @click="toggle"
    >
      <svg class="translate-globe" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.5 2.4 3.75 5.4 3.75 9s-1.25 6.6-3.75 9c-2.5-2.4-3.75-5.4-3.75-9S9.5 5.4 12 3ZM3.5 9h17M3.5 15h17"
        />
      </svg>
    </button>

    <div v-show="open" class="translate-panel" role="listbox">
      <div class="translate-search">
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="Search language…"
          spellcheck="false"
          @keydown.escape="close"
        />
      </div>

      <ul class="translate-list">
        <li v-for="lang in filtered" :key="lang.code">
          <button
            type="button"
            class="translate-option"
            :class="{ 'is-active': lang.code === current }"
            role="option"
            :aria-selected="lang.code === current"
            @click="pick(lang.code)"
          >
            <span>{{ lang.name }}</span>
            <svg
              v-if="lang.code === current"
              class="translate-check"
              viewBox="0 0 24 24"
              width="15"
              height="15"
              aria-hidden="true"
            >
              <path fill="none" stroke="currentColor" stroke-width="2" d="m5 13 4 4L19 7" />
            </svg>
          </button>
        </li>
        <li v-if="!filtered.length" class="translate-empty">No language found</li>
      </ul>
    </div>

    <div id="google_translate_element" class="translate-engine"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const LANGUAGES = [
  { code: '', name: 'English (Original)' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Albanian' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hy', name: 'Armenian' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'eu', name: 'Basque' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bn', name: 'Bengali' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'ca', name: 'Catalan' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'ny', name: 'Chichewa' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'co', name: 'Corsican' },
  { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian' },
  { code: 'tl', name: 'Filipino' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'fy', name: 'Frisian' },
  { code: 'gl', name: 'Galician' },
  { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'Hawaiian' },
  { code: 'iw', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jw', name: 'Javanese' },
  { code: 'kn', name: 'Kannada' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'km', name: 'Khmer' },
  { code: 'ko', name: 'Korean' },
  { code: 'ku', name: 'Kurdish (Kurmanji)' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'lo', name: 'Lao' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'ne', name: 'Nepali' },
  { code: 'no', name: 'Norwegian' },
  { code: 'ps', name: 'Pashto' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sm', name: 'Samoan' },
  { code: 'gd', name: 'Scots Gaelic' },
  { code: 'sr', name: 'Serbian' },
  { code: 'st', name: 'Sesotho' },
  { code: 'sn', name: 'Shona' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhala' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' },
  { code: 'es', name: 'Spanish' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'cy', name: 'Welsh' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'zu', name: 'Zulu' },
]

const root = ref(null)
const searchInput = ref(null)
const open = ref(false)
const query = ref('')
const languages = ref(LANGUAGES)
const current = ref('')

const currentLabel = computed(() => {
  if (!current.value) return 'English'
  const match = languages.value.find((l) => l.code === current.value)
  return match ? match.name : 'English'
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return languages.value
  return languages.value.filter((l) => l.name.toLowerCase().includes(q))
})

function toggle() {
  open.value = !open.value
  if (open.value) {
    query.value = ''
    nextTick(() => searchInput.value?.focus())
  }
}

function close() {
  open.value = false
}

function onDocClick(e) {
  if (root.value && !root.value.contains(e.target)) close()
}

function readCookieLang() {
  const raw = document.cookie.split('; ').find((c) => c.startsWith('googtrans='))
  if (!raw) return ''
  const parts = decodeURIComponent(raw.split('=')[1] || '').split('/')
  return parts[2] || ''
}

function writeCookie(code) {
  const value = code ? `/en/${code}` : ''
  const host = location.hostname
  const bases = [`googtrans=${value}; path=/`]
  if (host && host !== 'localhost') {
    bases.push(`googtrans=${value}; path=/; domain=${host}`)
    bases.push(`googtrans=${value}; path=/; domain=.${host}`)
  }
  if (!code) {
    // expire so original English is restored
    bases.forEach((b) => (document.cookie = `${b}; expires=Thu, 01 Jan 1970 00:00:00 GMT`))
    return
  }
  bases.forEach((b) => (document.cookie = b))
}

function pick(code) {
  if (code === current.value) {
    close()
    return
  }
  current.value = code
  writeCookie(code)
  close()
  setTimeout(() => location.reload(), 60)
}

function syncFromEngine(attempts = 40) {
  const combo = document.querySelector('.goog-te-combo')
  if (combo && combo.options.length > 1) {
    const opts = Array.from(combo.options)
      .filter((o) => o.value)
      .map((o) => ({ code: o.value, name: o.textContent.trim() }))
    if (opts.length) languages.value = [{ code: '', name: 'English (Original)' }, ...opts]
    return
  }
  if (attempts > 0) setTimeout(() => syncFromEngine(attempts - 1), 250)
}

function initGoogleTranslate() {
  window.googleTranslateElementInit = () => {
    if (window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      )
    }
  }

  if (!document.querySelector('script[src*="translate_a/element.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.defer = true
    document.body.appendChild(script)
  }
}

onMounted(() => {
  current.value = readCookieLang()
  initGoogleTranslate()
  syncFromEngine()
  document.addEventListener('click', onDocClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
})
</script>

<style scoped>
.translate-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
}

.translate-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.translate-trigger:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.translate-globe {
  flex-shrink: 0;
}

.translate-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 100;
  width: 260px;
  max-height: 340px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  overflow: hidden;
}

.translate-search {
  padding: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.translate-search input {
  width: 100%;
  height: 34px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.translate-search input:focus {
  border-color: var(--vp-c-brand-1);
}

.translate-list {
  list-style: none;
  margin: 0;
  padding: 6px;
  overflow-y: auto;
}

.translate-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.translate-option:hover {
  background: var(--vp-c-default-soft);
}

.translate-option.is-active {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.translate-check {
  flex-shrink: 0;
}

.translate-empty {
  padding: 14px 10px;
  color: var(--vp-c-text-3);
  font-size: 13px;
  text-align: center;
}

.translate-engine {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  opacity: 0;
  pointer-events: none;
}
</style>
