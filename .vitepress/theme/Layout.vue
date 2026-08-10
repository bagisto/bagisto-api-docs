<template>
  <Layout>
    <template #nav-bar-content-after>
      <GoogleTranslate v-if="isClient" />
    </template>

    <template #aside-bottom>
      <GraphQLExamplesPanel
        v-if="isClient && pageExamples.length && isGraphQL"
        :examples="pageExamples"
      />

      <RestExamplesPanel
        v-if="isClient && pageExamples.length && !isGraphQL"
        :examples="pageExamples"
      />
    </template>
  </Layout>

  <template v-if="isClient && hasExamples">
    <button
      class="examples-fab"
      type="button"
      aria-label="Show examples"
      @click="examplesOpen = true"
    >
      &lt;/&gt; Examples
    </button>

    <Teleport to="body">
      <div
        v-if="examplesOpen"
        class="examples-drawer-backdrop"
        @click="examplesOpen = false"
      />
      <aside class="examples-drawer" :class="{ open: examplesOpen }">
        <button
          class="examples-drawer-close"
          type="button"
          aria-label="Close examples"
          @click="examplesOpen = false"
        >
          &times;
        </button>
        <GraphQLExamplesPanel v-if="isGraphQL" :examples="pageExamples" />
        <RestExamplesPanel v-else :examples="pageExamples" />
      </aside>
    </Teleport>
  </template>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import GoogleTranslate from './components/GoogleTranslate.vue'
import GraphQLExamplesPanel from './components/GraphQLExamplesPanel.vue'
import RestExamplesPanel from './components/RestExamplesPanel.vue'

const { Layout } = DefaultTheme
const route = useRoute()

const pageExamples = ref([])
const isClient = ref(false)
const examplesOpen = ref(false)

const hasExamples = computed(() => pageExamples.value.length > 0)

const isGraphQL = computed(() => {
  if (pageExamples.value.length === 0) return false
  if (route.data?.frontmatter?.apiType === 'rest') return false
  const firstExample = pageExamples.value[0]
  return 'query' in firstExample
})


const applyPageAttrs = () => {
  if (import.meta.env.SSR) return
  const html = document.documentElement
  html.classList.toggle('api-page', route.path.startsWith('/api/'))
  html.setAttribute('data-path', route.path)
}

function scrollSidebarToActive() {
  if (import.meta.env.SSR) return

  const tryScroll = (attemptsLeft) => {
    const sidebar = document.querySelector('.VPSidebar')
    const active = sidebar && sidebar.querySelector('.VPSidebarItem.is-active')

    if (sidebar && active) {
      const sRect = sidebar.getBoundingClientRect()
      const aRect = active.getBoundingClientRect()

      const isVisible = aRect.top >= sRect.top && aRect.bottom <= sRect.bottom
      if (!isVisible) {
        sidebar.scrollTop += (aRect.top - sRect.top) - sidebar.clientHeight / 3
      }
      return
    }

    if (attemptsLeft > 0) {
      setTimeout(() => tryScroll(attemptsLeft - 1), 120)
    }
  }

  nextTick(() => tryScroll(8))
}

function loadExamples() {
  nextTick(() => {
    if (route.data?.frontmatter?.examples) {
      pageExamples.value = route.data.frontmatter.examples
    } else {
      pageExamples.value = []
    }
  })
}

const onKeydown = (e) => {
  if (e.key === 'Escape') examplesOpen.value = false
}

onMounted(() => {
  isClient.value = true
  applyPageAttrs()
  loadExamples()
  scrollSidebarToActive()
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (!import.meta.env.SSR) window.removeEventListener('keydown', onKeydown)
})

watch(() => route.path, () => {
  examplesOpen.value = false
  applyPageAttrs()
  loadExamples()
  scrollSidebarToActive()
})

watch(examplesOpen, (open) => {
  if (import.meta.env.SSR) return
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>
