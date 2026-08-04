<template>
  <div ref="root" class="ex-select">
    <button
      type="button"
      class="ex-select-trigger"
      :class="{ open }"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span class="ex-select-label">{{ currentLabel }}</span>
      <svg class="ex-select-caret" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M10.293 3.293 6 7.586 1.707 3.293A1 1 0 0 0 .293 4.707l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414z" />
      </svg>
    </button>

    <ul v-if="open" class="ex-select-menu" role="listbox">
      <li
        v-for="opt in options"
        :key="opt.id"
        class="ex-select-option"
        :class="{ 'is-active': opt.id === modelValue }"
        role="option"
        :aria-selected="opt.id === modelValue"
        @click="pick(opt.id)"
      >
        {{ opt.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  id: string
  title: string
}

const props = withDefaults(
  defineProps<{ options?: Option[]; modelValue?: string }>(),
  { options: () => [], modelValue: '' }
)

const emit = defineEmits<{ (e: 'update:modelValue', id: string): void }>()

const root = ref<HTMLElement | null>(null)
const open = ref(false)

const currentLabel = computed(() => {
  const o = props.options.find((x) => x.id === props.modelValue)
  return o ? o.title : 'Select…'
})

function pick(id: string) {
  emit('update:modelValue', id)
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.ex-select {
  position: relative;
  width: 100%;
}

.ex-select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.ex-select-trigger:hover,
.ex-select-trigger.open {
  border-color: var(--vp-c-brand-1, var(--vp-c-brand));
}

.ex-select-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.ex-select-caret {
  flex: none;
  opacity: 0.7;
  transition: transform 0.2s ease;
}
.ex-select-trigger.open .ex-select-caret {
  transform: rotate(180deg);
}

.ex-select-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 90;
  margin: 0;
  padding: 4px;
  list-style: none;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  max-height: 320px;
  overflow-y: auto;
}

.ex-select-option {
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.ex-select-option:hover {
  background: var(--vp-c-bg-soft);
}
.ex-select-option.is-active {
  background: var(--vp-c-brand-soft, var(--vp-c-default-soft));
  color: var(--vp-c-brand-1, var(--vp-c-brand));
  font-weight: 600;
}
</style>
