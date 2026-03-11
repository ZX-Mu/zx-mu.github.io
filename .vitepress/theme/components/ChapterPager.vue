<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { buildChapterLink, findChapterByPath } from '../../../garden/cultural-creative/_shared/culturalCreative'

const route = useRoute()
const chapterState = computed(() => findChapterByPath(route.path))
</script>

<template>
  <div v-if="chapterState" class="cc-pager">
    <div class="cc-pager-top">
      <a :href="chapterState.course.overviewLink">返回{{ chapterState.course.title }}总览</a>
      <span>{{ chapterState.module?.title }} · {{ chapterState.module?.range }}</span>
    </div>

    <div class="cc-pager-switch">
      <a
        :href="buildChapterLink(chapterState.course.slug, chapterState.current.number, 'summary')"
        :class="{ active: chapterState.currentType === 'summary' }"
      >
        这章总结
      </a>
      <a
        :href="buildChapterLink(chapterState.course.slug, chapterState.current.number, 'original')"
        :class="{ active: chapterState.currentType === 'original' }"
      >
        这章原文
      </a>
    </div>

    <div class="cc-pager-nav">
      <a
        v-if="chapterState.previous"
        :href="buildChapterLink(chapterState.course.slug, chapterState.previous.number, chapterState.currentType)"
        class="cc-pager-card"
      >
        <span>上一章</span>
        <strong>第 {{ chapterState.previous.number }} 章 · {{ chapterState.previous.title }}</strong>
      </a>
      <div v-else class="cc-pager-card muted">
        <span>上一章</span>
        <strong>已经是第一章</strong>
      </div>

      <a
        v-if="chapterState.next"
        :href="buildChapterLink(chapterState.course.slug, chapterState.next.number, chapterState.currentType)"
        class="cc-pager-card"
      >
        <span>下一章</span>
        <strong>第 {{ chapterState.next.number }} 章 · {{ chapterState.next.title }}</strong>
      </a>
      <div v-else class="cc-pager-card muted">
        <span>下一章</span>
        <strong>已经是最后一章</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cc-pager {
  display: grid;
  gap: 12px;
  margin: 16px 0 24px;
}

.cc-pager-top,
.cc-pager-switch,
.cc-pager-card {
  border: 1px solid rgba(255, 142, 122, 0.12);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, var(--vp-c-bg-soft) 100%);
}

.cc-pager-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 14px 16px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.cc-pager-top a {
  color: var(--vp-c-brand-1) !important;
  text-decoration: none !important;
  font-weight: 600;
}

.cc-pager-switch {
  display: flex;
  gap: 8px;
  padding: 8px;
}

.cc-pager-switch a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 12px;
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  font-weight: 600;
}

.cc-pager-switch a.active {
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  color: #fff !important;
}

.cc-pager-nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.cc-pager-card {
  display: grid;
  gap: 6px;
  padding: 16px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
}

.cc-pager-card span {
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 700;
}

.cc-pager-card strong {
  line-height: 1.6;
}

.cc-pager-card.muted {
  opacity: 0.65;
}

.dark .cc-pager-top,
.dark .cc-pager-switch,
.dark .cc-pager-card {
  border-color: rgba(255, 179, 167, 0.1);
  background: linear-gradient(180deg, rgba(35, 35, 35, 0.95) 0%, var(--vp-c-bg-soft) 100%);
}

@media (max-width: 640px) {
  .cc-pager-nav {
    grid-template-columns: 1fr;
  }
}
</style>
