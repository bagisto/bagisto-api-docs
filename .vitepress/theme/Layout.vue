<template>
  <Layout>
    <!-- Client-only navbar content -->
    <template #nav-bar-content-after>
      <GoogleTranslate v-if="isClient" />
    </template>

    <!-- Client-only examples panel -->
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
</template>

<script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import GoogleTranslate from './components/GoogleTranslate.vue'
import GraphQLExamplesPanel from './components/GraphQLExamplesPanel.vue'
import RestExamplesPanel from './components/RestExamplesPanel.vue'

const { Layout } = DefaultTheme
const route = useRoute()

const pageExamples = ref([])
const isClient = ref(false)

/*
|--------------------------------------------------------------------------
| Detect GraphQL vs REST (UNCHANGED LOGIC)
|--------------------------------------------------------------------------
*/
const isGraphQL = computed(() => {
  if (pageExamples.value.length === 0) return false
  // Allow pages to explicitly set apiType: rest in frontmatter
  // to use the REST panel (cURL-first tabs, no GraphQL tab)
  if (route.data?.frontmatter?.apiType === 'rest') return false
  const firstExample = pageExamples.value[0]
  return 'query' in firstExample
})

/*
|--------------------------------------------------------------------------
| SSR SAFE DOM STYLING
|--------------------------------------------------------------------------
*/
const updateAsideStyles = () => {
  // ⭐⭐ CRITICAL FIX — prevents SSR crash
  if (import.meta.env.SSR) return

  const asideContainer = document.querySelector('.aside-container')
  const examplesSidebar = document.querySelector('.examples-sidebar')

  if (asideContainer && examplesSidebar) {
    asideContainer.style.setProperty('width', '350px', 'important')
    asideContainer.style.setProperty('max-width', '350px', 'important')

    const content = document.querySelector('.content')
    if (content) {
      content.style.setProperty('min-width', '540px', 'important')
    }

    const aside = document.querySelector('.aside')
    if (aside) {
      aside.style.setProperty('max-width', '400px', 'important')
    }
  } else if (asideContainer) {
    asideContainer.style.width = ''
    asideContainer.style.maxWidth = ''

    const content = document.querySelector('.content')
    if (content) content.style.minWidth = ''

    const aside = document.querySelector('.aside')
    if (aside) aside.style.maxWidth = ''
  }
}

/*
|--------------------------------------------------------------------------
| Scroll the sidebar so the active menu item is visible
|--------------------------------------------------------------------------
| VitePress auto-expands the group containing the current page but does not
| scroll the sidebar to it. On a hard reload a deep link can sit far below
| the fold. This scrolls the sidebar container (not the window) so the active
| item lands ~1/3 from the top — only when it isn't already in view.
*/
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

/*
|--------------------------------------------------------------------------
| Load Examples (UNCHANGED)
|--------------------------------------------------------------------------
*/
function loadExamples() {
  nextTick(() => {
    if (route.data?.frontmatter?.examples) {
      pageExamples.value = route.data.frontmatter.examples
    } else {
      pageExamples.value = []
    }
  })
}

/*
|--------------------------------------------------------------------------
| Lifecycle (UNCHANGED LOGIC)
|--------------------------------------------------------------------------
*/
onMounted(() => {
  isClient.value = true
  loadExamples()
  scrollSidebarToActive()
})

watch(() => route.path, () => {
  loadExamples()
  scrollSidebarToActive()
})

watch(
  pageExamples,
  async () => {
    if (!isClient.value) return   // ⭐ extra client guard

    await nextTick()
    updateAsideStyles()
  },
  { immediate: true }
)
</script>
