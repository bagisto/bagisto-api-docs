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
})

watch(() => route.path, () => {
  loadExamples()
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
