<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import type { Component } from 'vue'
import { flattenCourseChapters, getCourse } from '../_shared/culturalCreative'

type ChapterComponentModule = {
  default: Component
}

type PreviewType = 'summary' | 'original'
type PreviewView = 'overview' | 'full-summary' | 'chapter'

const props = defineProps<{
  course: string
}>()

const course = computed(() => getCourse(props.course))
const chapterItems = computed(() => (course.value ? flattenCourseChapters(course.value) : []))
const activeView = ref<PreviewView>('overview')
const activeChapterNumber = ref<number | null>(null)
const activePreviewType = ref<PreviewType>('summary')
const activePreview = shallowRef<Component | null>(null)
const isPreviewLoading = ref(false)
const showBackToTop = ref(false)
const isSidebarOpen = ref(false)
const chapterModules = import.meta.glob('../*/chapter-*/*.md')
const fullSummaryModules = import.meta.glob('../*/full-summary.md')
const overviewModules = import.meta.glob('../*/_index.md')

let previewRequestId = 0

const activeChapter = computed(
  () => chapterItems.value.find((chapter) => chapter.number === activeChapterNumber.value) ?? null,
)

const activeModule = computed(() => {
  if (!course.value || !activeChapter.value) {
    return null
  }

  return course.value.modules.find((module) => module.id === activeChapter.value?.moduleId) ?? null
})

function chapterNum(n: number) {
  return String(n).padStart(2, '0')
}

function chapterHash(n: number) {
  return `chapter-${chapterNum(n)}`
}

function readPreviewFromHash() {
  if (typeof window === 'undefined') {
    return { view: 'overview' as PreviewView, number: null as number | null }
  }

  if (window.location.hash === '#full-summary') {
    return { view: 'full-summary' as PreviewView, number: null as number | null }
  }

  const chapterMatch = window.location.hash.match(/^#chapter-(\d{2})$/)
  if (chapterMatch) {
    return { view: 'chapter' as PreviewView, number: Number(chapterMatch[1]) }
  }

  return { view: 'overview' as PreviewView, number: null as number | null }
}

async function loadModule(path: string, modules: Record<string, () => Promise<unknown>>) {
  const loader = modules[path]
  const requestId = ++previewRequestId

  if (!loader) {
    activePreview.value = null
    isPreviewLoading.value = false
    return
  }

  isPreviewLoading.value = true

  try {
    const mod = (await loader()) as ChapterComponentModule
    if (requestId !== previewRequestId) {
      return
    }

    activePreview.value = markRaw(mod.default)
  } catch {
    if (requestId !== previewRequestId) {
      return
    }

    activePreview.value = null
  } finally {
    if (requestId === previewRequestId) {
      isPreviewLoading.value = false
    }
  }
}

async function loadChapterPreview(number: number) {
  const path = `../${props.course}/chapter-${chapterNum(number)}/${activePreviewType.value}.md`
  await loadModule(path, chapterModules)
}

async function loadFullSummaryPreview() {
  const path = `../${props.course}/full-summary.md`
  await loadModule(path, fullSummaryModules)
}

async function loadOverviewPreview() {
  const path = `../${props.course}/_index.md`
  await loadModule(path, overviewModules)
}

async function setActiveChapter(
  number: number,
  options: {
    updateHash?: boolean
    resetPreviewType?: boolean
  } = {},
) {
  if (!chapterItems.value.some((chapter) => chapter.number === number)) {
    return
  }

  if (options.resetPreviewType !== false) {
    activePreviewType.value = 'summary'
  }

  activeView.value = 'chapter'
  activeChapterNumber.value = number
  await loadChapterPreview(number)

  if (options.updateHash !== false && typeof window !== 'undefined') {
    window.history.replaceState(null, '', `#${chapterHash(number)}`)
  }
}

async function setActiveOverview(options: { updateHash?: boolean } = {}) {
  activeView.value = 'overview'
  await loadOverviewPreview()

  if (options.updateHash !== false && typeof window !== 'undefined') {
    window.history.replaceState(null, '', '#overview')
  }
}

async function setActiveFullSummary(options: { updateHash?: boolean } = {}) {
  activeView.value = 'full-summary'
  activePreviewType.value = 'summary'
  await loadFullSummaryPreview()

  if (options.updateHash !== false && typeof window !== 'undefined') {
    window.history.replaceState(null, '', '#full-summary')
  }
}

function handleChapterClick(number: number) {
  void setActiveChapter(number)
  // 在移动端点击章节后关闭侧边栏
  if (window.innerWidth <= 1100) {
    isSidebarOpen.value = false
  }
}

function handlePreviewTypeChange(type: PreviewType) {
  if (activeView.value !== 'chapter' || type === activePreviewType.value || activeChapterNumber.value === null) {
    return
  }

  activePreviewType.value = type
  void loadChapterPreview(activeChapterNumber.value)
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

function updateBackToTopVisibility() {
  showBackToTop.value = window.scrollY > 480
}

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function handleHashChange() {
  const nextPreview = readPreviewFromHash()

  if (nextPreview.view === 'chapter' && nextPreview.number) {
    if (activeView.value !== 'chapter' || nextPreview.number !== activeChapterNumber.value) {
      void setActiveChapter(nextPreview.number, { updateHash: false })
    }
    return
  }

  if (nextPreview.view === 'full-summary') {
    if (activeView.value !== 'full-summary') {
      void setActiveFullSummary({ updateHash: false })
    }
    return
  }

  if (activeView.value !== 'overview') {
    void setActiveOverview({ updateHash: false })
  }
}

watch(
  chapterItems,
  async (items) => {
    if (!items.length) {
      activeView.value = 'overview'
      activeChapterNumber.value = null
      activePreviewType.value = 'summary'
      activePreview.value = null
      return
    }

    const initialPreview = readPreviewFromHash()

    if (initialPreview.view === 'chapter' && initialPreview.number) {
      await setActiveChapter(initialPreview.number, { updateHash: false })
      return
    }

    if (initialPreview.view === 'full-summary') {
      await setActiveFullSummary({ updateHash: false })
      return
    }

    await setActiveOverview({ updateHash: false })
  },
  { immediate: true },
)

onMounted(() => {
  updateBackToTopVisibility()
  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
  window.addEventListener('hashchange', handleHashChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateBackToTopVisibility)
  window.removeEventListener('hashchange', handleHashChange)
})
</script>

<template>
  <div v-if="course" class="cc-overview">
    <section class="cc-overview-hero">
      <a href="/garden/cultural-creative/" class="cc-overview-back-link">返回文创首页</a>
      <h1 class="cc-overview-title">{{ course.title }}</h1>
    </section>

    <!-- 移动端目录按钮 -->
    <button
      type="button"
      class="cc-sidebar-toggle"
      aria-label="打开目录"
      @click="toggleSidebar"
    >
      <span class="cc-sidebar-toggle-icon">☰</span>
      <span>目录</span>
    </button>

    <!-- 遮罩层 -->
    <Transition name="cc-backdrop-fade">
      <div
        v-if="isSidebarOpen"
        class="cc-sidebar-backdrop"
        @click="closeSidebar"
      />
    </Transition>

    <section id="chapter-workspace" class="cc-overview-workspace">
      <aside class="cc-overview-sidebar" :class="{ 'is-open': isSidebarOpen }">
        <!-- 移动端关闭按钮 -->
        <button
          type="button"
          class="cc-sidebar-close"
          aria-label="关闭目录"
          @click="closeSidebar"
        >
          ✕
        </button>

        <section class="cc-overview-top-nav">
          <button
            type="button"
            class="cc-overview-top-link"
            :class="{ active: activeView === 'overview' }"
            @click="setActiveOverview()"
          >
            课程总览
          </button>
          <button
            type="button"
            class="cc-overview-top-link"
            :class="{ active: activeView === 'full-summary' }"
            @click="setActiveFullSummary()"
          >
            全课重点
          </button>
        </section>

        <div class="cc-overview-sidebar-groups">
          <section
            v-for="module in course.modules"
            :key="module.id"
            class="cc-overview-module"
          >
            <div class="cc-overview-module-header">
              <span class="cc-overview-module-range">{{ module.range }}</span>
              <h3>{{ module.title }}</h3>
            </div>

            <div class="cc-overview-chapter-list">
              <button
                v-for="chapter in module.chapters"
                :key="chapter.number"
                type="button"
                class="cc-overview-chapter-row"
                :class="{ active: activeView === 'chapter' && activeChapterNumber === chapter.number }"
                @click="handleChapterClick(chapter.number)"
              >
                <span class="cc-chapter-num">{{ chapterNum(chapter.number) }}</span>
                <span class="cc-chapter-title">{{ chapter.title }}</span>
              </button>
            </div>
          </section>
        </div>
      </aside>

      <section class="cc-overview-preview">
        <div v-if="activeView === 'chapter' && activeChapter" class="cc-preview-head">
          <p class="cc-preview-kicker">
            {{ activeModule?.range }} · {{ activeModule?.title }}
          </p>
          <div class="cc-preview-title-row">
            <div>
              <h2>{{ activeChapter.title }}</h2>
              <p class="cc-preview-meta">
                第 {{ chapterNum(activeChapter.number) }} 章
                {{ activePreviewType === 'summary' ? '干货整理' : '原文整理' }}
              </p>
            </div>
            <div class="cc-preview-actions">
              <button
                type="button"
                class="cc-preview-toggle"
                :class="{ active: activePreviewType === 'summary' }"
                @click="handlePreviewTypeChange('summary')"
              >
                干货
              </button>
              <button
                type="button"
                class="cc-preview-toggle"
                :class="{ active: activePreviewType === 'original' }"
                @click="handlePreviewTypeChange('original')"
              >
                原文
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="activeView === 'overview'" class="cc-preview-head">
          <p class="cc-preview-kicker">课程导览</p>
          <div class="cc-preview-title-row">
            <div>
              <h2>{{ course.title }}课程总览</h2>
              <p class="cc-preview-meta">{{ course.intro }}</p>
            </div>
          </div>
        </div>

        <div v-else class="cc-preview-head">
          <p class="cc-preview-kicker">课程导览</p>
          <div class="cc-preview-title-row">
            <div>
              <h2>全课重点</h2>
              <p class="cc-preview-meta">{{ course.title }}重点整理</p>
            </div>
          </div>
        </div>

        <div class="cc-preview-body">
          <div v-if="isPreviewLoading" class="cc-preview-state">
            正在加载章节内容…
          </div>
          <div v-else-if="activePreview" class="vp-doc cc-preview-doc">
            <component
              :is="activePreview"
              :key="activeView === 'chapter' ? `${activeChapterNumber}-${activePreviewType}` : activeView"
            />
          </div>
          <div v-else class="cc-preview-state">
            暂时没有可展示的章节内容。
          </div>
        </div>
      </section>
    </section>

    <Transition name="cc-back-to-top-fade">
      <button
        v-if="showBackToTop"
        type="button"
        class="cc-back-to-top"
        aria-label="返回顶部"
        @click="backToTop"
      >
        返回顶部
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.cc-overview {
  display: grid;
  gap: 28px;
  width: min(1440px, 100%);
  margin: 0 auto;
  padding: 20px 24px 48px;
  box-sizing: border-box;
  position: relative;
}

/* 移动端目录按钮 - 默认隐藏 */
.cc-sidebar-toggle {
  display: none;
}

/* 移动端侧边栏关闭按钮 - 默认隐藏 */
.cc-sidebar-close {
  display: none;
}

/* 遮罩层 - 默认隐藏 */
.cc-sidebar-backdrop {
  display: none;
}

.cc-overview-hero {
  display: grid;
  gap: 8px;
  padding-top: 8px;
}

.cc-overview-back-link {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  color: var(--vp-c-text-2) !important;
  font-size: 13px;
  text-decoration: none !important;
  transition: color 0.22s ease;
}

.cc-overview-back-link:hover {
  color: var(--vp-c-brand-1) !important;
}

.cc-overview-title {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  line-height: 1.3;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.02em;
}

.cc-overview-workspace {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.cc-overview-sidebar {
  flex: 0 0 40%;
  min-width: 320px;
  max-width: 440px;
  display: grid;
  grid-template-rows: auto auto;
  gap: 18px;
  padding: 24px;
  border-radius: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(255, 142, 122, 0.1);
}

.cc-overview-top-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 142, 122, 0.1);
}

.cc-overview-top-link {
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0 14px;
  border: 1px solid rgba(255, 142, 122, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 0.22s ease,
    background 0.22s ease,
    color 0.22s ease;
}

.cc-overview-top-link:hover {
  border-color: rgba(255, 142, 122, 0.24);
  color: var(--vp-c-brand-1);
}

.cc-overview-top-link.active {
  border-color: rgba(255, 142, 122, 0.26);
  background: rgba(255, 142, 122, 0.08);
  color: var(--vp-c-brand-1);
}

.cc-overview-sidebar-groups {
  display: grid;
  grid-auto-rows: auto;
  gap: 18px;
}

.cc-overview-module {
  display: grid;
  grid-template-rows: auto auto;
  gap: 10px;
}

.cc-overview-module-header {
  display: grid;
  grid-template-rows: auto auto;
  gap: 4px;
}

.cc-overview-module-range {
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 700;
}

.cc-overview-module-header h3 {
  margin: 0 !important;
  border: 0 !important;
  font-size: 1rem !important;
}

.cc-overview-chapter-list {
  display: grid;
  grid-auto-rows: auto;
  gap: 8px;
}

.cc-overview-chapter-row {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255, 142, 122, 0.1);
  background: rgba(255, 255, 255, 0.72);
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    background 0.22s ease;
}

.cc-overview-chapter-row:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 142, 122, 0.24);
}

.cc-overview-chapter-row.active {
  background: rgba(255, 142, 122, 0.08);
  border-color: rgba(255, 142, 122, 0.24);
}

.cc-chapter-num {
  color: rgba(255, 142, 122, 0.7);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.cc-chapter-title {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.55;
}

.cc-overview-preview {
  flex: 1 1 60%;
  display: grid;
  gap: 14px;
  min-width: 0;
}

.cc-preview-head {
  padding: 0 0 14px;
  border-bottom: 1px solid rgba(255, 142, 122, 0.12);
}

.cc-preview-kicker {
  margin: 0 0 6px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.cc-preview-title-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.cc-preview-title-row h2 {
  margin: 0 !important;
  border: 0 !important;
  padding: 0 !important;
  font-size: 1.4rem !important;
  line-height: 1.35;
}

.cc-preview-meta {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.cc-preview-actions {
  display: flex;
  gap: 8px;
}

.cc-preview-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(255, 142, 122, 0.14);
  border-radius: 10px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease;
}

.cc-preview-toggle:hover {
  background: rgba(255, 142, 122, 0.06);
  border-color: rgba(255, 142, 122, 0.2);
  color: var(--vp-c-brand-1);
}

.cc-preview-toggle.active {
  background: rgba(255, 142, 122, 0.1);
  border-color: rgba(255, 142, 122, 0.24);
  color: var(--vp-c-text-1);
}

.cc-preview-body {
  min-width: 0;
  padding: 28px 30px;
  border-radius: 24px;
  background: var(--vp-c-bg);
  border: 1px solid rgba(255, 142, 122, 0.08);
  box-shadow: 0 18px 42px rgba(255, 142, 122, 0.06);
}

.cc-preview-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.cc-preview-doc {
  min-width: 0;
}

.cc-preview-doc :deep(.header-anchor) {
  display: none;
}

.cc-preview-doc :deep(h1) {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.cc-preview-doc :deep(h2) {
  margin-top: 0 !important;
}

.cc-back-to-top {
  position: fixed;
  right: 24px;
  bottom: 28px;
  z-index: 30;
  border: 0;
  border-radius: 999px;
  padding: 11px 16px;
  background: rgba(60, 60, 60, 0.78);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 12px 30px rgba(20, 20, 20, 0.14);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease,
    background 0.25s ease;
}

.cc-back-to-top:hover {
  background: rgba(60, 60, 60, 0.9);
  transform: translateY(-2px);
}

.cc-back-to-top-fade-enter-active,
.cc-back-to-top-fade-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.cc-back-to-top-fade-enter-from,
.cc-back-to-top-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.dark .cc-overview-sidebar {
  background: rgba(35, 35, 35, 0.94);
  border-color: rgba(255, 179, 167, 0.08);
}

.dark .cc-overview-top-nav {
  border-bottom-color: rgba(255, 179, 167, 0.1);
}

.dark .cc-overview-top-link {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.04);
  color: var(--vp-c-text-1);
}

.dark .cc-overview-top-link:hover {
  border-color: rgba(255, 179, 167, 0.18);
  background: rgba(255, 255, 255, 0.05);
}

.dark .cc-overview-top-link.active {
  background: rgba(255, 179, 167, 0.08);
  border-color: rgba(255, 179, 167, 0.22);
  color: var(--vp-c-brand-1);
}

.dark .cc-preview-head {
  border-bottom-color: rgba(255, 179, 167, 0.12);
}

.dark .cc-overview-chapter-row {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.04);
}

.dark .cc-overview-chapter-row:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 179, 167, 0.18);
}

.dark .cc-overview-chapter-row.active {
  background: rgba(255, 179, 167, 0.08);
  border-color: rgba(255, 179, 167, 0.24);
}

.dark .cc-chapter-num {
  color: rgba(255, 179, 167, 0.5);
}

.dark .cc-preview-toggle {
  background: transparent;
  border-color: rgba(255, 179, 167, 0.14);
  color: var(--vp-c-text-2);
}

.dark .cc-preview-toggle:hover {
  background: rgba(255, 179, 167, 0.08);
  border-color: rgba(255, 179, 167, 0.18);
  color: var(--vp-c-brand-1);
}

.dark .cc-preview-toggle.active {
  background: rgba(255, 179, 167, 0.12);
  border-color: rgba(255, 179, 167, 0.22);
  color: var(--vp-c-text-1);
}

.dark .cc-preview-body {
  background: #1a1a1a;
  border-color: rgba(255, 255, 255, 0.04);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.2);
}

.dark .cc-back-to-top {
  background: rgba(240, 240, 240, 0.14);
  color: var(--vp-c-text-1);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
}

.dark .cc-back-to-top:hover {
  background: rgba(240, 240, 240, 0.22);
}

.dark .cc-sidebar-close {
  background: rgba(255, 255, 255, 0.08);
  color: var(--vp-c-text-1);
}

.dark .cc-sidebar-close:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* 平板和中等屏幕 - 抽屉模式 */
@media (max-width: 1100px) {
  /* 显示目录按钮 */
  .cc-sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 16px;
    border: 1px solid rgba(255, 142, 122, 0.2);
    border-radius: 12px;
    background: rgba(255, 142, 122, 0.08);
    color: var(--vp-c-brand-1);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .cc-sidebar-toggle:hover {
    background: rgba(255, 142, 122, 0.12);
    border-color: rgba(255, 142, 122, 0.3);
  }

  .cc-sidebar-toggle:active {
    transform: scale(0.98);
  }

  .cc-sidebar-toggle-icon {
    font-size: 18px;
    line-height: 1;
  }

  /* 遮罩层 */
  .cc-sidebar-backdrop {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 49;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  .cc-backdrop-fade-enter-active,
  .cc-backdrop-fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .cc-backdrop-fade-enter-from,
  .cc-backdrop-fade-leave-to {
    opacity: 0;
  }

  /* 侧边栏抽屉样式 */
  .cc-overview-workspace {
    flex-direction: column;
  }

  .cc-overview-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 50;
    flex: none;
    min-width: 0;
    max-width: 85%;
    width: 320px;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
    border-radius: 0 18px 18px 0;
  }

  .cc-overview-sidebar.is-open {
    transform: translateX(0);
  }

  /* 关闭按钮 */
  .cc-sidebar-close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.05);
    color: var(--vp-c-text-1);
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .cc-sidebar-close:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .cc-overview-preview {
    width: 100%;
  }
}

/* 手机端适配 */
@media (max-width: 640px) {
  .cc-overview {
    padding: 12px 16px 36px;
    gap: 16px;
  }

  .cc-overview-hero {
    gap: 4px;
    margin-bottom: 4px;
  }

  .cc-overview-back-link {
    font-size: 12px;
  }

  .cc-overview-title {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
  }

  .cc-overview-sidebar {
    display: flex;
    flex-direction: column;
    padding: 18px;
    border-radius: 18px;
    gap: 10px;
  }

  .cc-overview-top-nav {
    gap: 8px;
    padding-bottom: 12px;
  }

  .cc-overview-top-link {
    flex-shrink: 0;
    height: 38px;
    padding: 0 12px;
    font-size: 13px;
    border-radius: 12px;
  }

  .cc-overview-sidebar-groups {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .cc-overview-module {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cc-overview-module-range {
    font-size: 11px;
  }

  .cc-overview-module-header h3 {
    font-size: 0.95rem !important;
  }

  .cc-overview-chapter-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .cc-overview-chapter-row {
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
  }

  .cc-chapter-num {
    font-size: 11px;
  }

  .cc-chapter-title {
    font-size: 13px;
    line-height: 1.5;
  }

  .cc-preview-head {
    padding: 0 0 12px;
  }

  .cc-preview-kicker {
    font-size: 11px;
    margin: 0 0 4px;
  }

  .cc-preview-title-row {
    flex-direction: column;
    gap: 12px;
  }

  .cc-preview-title-row h2 {
    font-size: 1.2rem !important;
  }

  .cc-preview-meta {
    font-size: 12px;
    margin: 6px 0 0;
  }

  .cc-preview-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .cc-preview-toggle {
    height: 30px;
    padding: 0 10px;
    font-size: 11px;
    border-radius: 8px;
  }

  .cc-preview-body {
    padding: 20px 18px;
    border-radius: 18px;
  }

  .cc-preview-state {
    min-height: 200px;
    font-size: 13px;
  }

  .cc-back-to-top {
    right: 16px;
    bottom: 20px;
    padding: 9px 14px;
    font-size: 11px;
  }
}

/* 小尺寸手机适配 */
@media (max-width: 480px) {
  .cc-overview {
    padding: 8px 12px 28px;
    gap: 16px;
  }

  .cc-overview-hero h1 {
    font-size: 1.3rem !important;
  }

  .cc-overview-sidebar {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 0 16px 16px 0;
    gap: 8px;
  }

  .cc-overview-top-nav {
    gap: 8px;
    padding-bottom: 10px;
  }

  .cc-overview-top-link {
    flex-shrink: 0;
    height: 36px;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 10px;
  }

  .cc-overview-sidebar-groups {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .cc-overview-module {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .cc-overview-chapter-row {
    grid-template-columns: 38px minmax(0, 1fr);
    gap: 8px;
    padding: 8px 10px;
    border-radius: 10px;
  }

  .cc-chapter-num {
    font-size: 10px;
  }

  .cc-chapter-title {
    font-size: 12px;
  }

  .cc-preview-title-row h2 {
    font-size: 1.1rem !important;
  }

  .cc-preview-body {
    padding: 16px 14px;
    border-radius: 16px;
  }

  .cc-preview-state {
    min-height: 160px;
    font-size: 12px;
  }

  .cc-back-to-top {
    right: 12px;
    bottom: 16px;
    padding: 8px 12px;
    font-size: 10px;
  }
}

/* 触摸设备优化 - 禁用 hover 效果 */
@media (hover: none) and (pointer: coarse) {
  .cc-overview-back-link:hover {
    color: var(--vp-c-text-2) !important;
  }

  .cc-overview-top-link:hover {
    border-color: rgba(255, 142, 122, 0.1);
    color: var(--vp-c-text-1);
  }

  .cc-overview-chapter-row:hover {
    transform: none;
    border-color: rgba(255, 142, 122, 0.1);
  }

  .cc-preview-toggle:hover {
    background: transparent;
    border-color: rgba(255, 142, 122, 0.14);
    color: var(--vp-c-text-2);
  }

  .cc-back-to-top:hover {
    background: rgba(60, 60, 60, 0.78);
    transform: none;
  }

  /* 添加触摸反馈 */
  .cc-overview-top-link:active,
  .cc-overview-chapter-row:active,
  .cc-preview-toggle:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }

  .cc-back-to-top:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
}
</style>
