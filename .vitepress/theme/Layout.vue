<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ChapterPager from './components/ChapterPager.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <ChapterPager />
    </template>
    <template #doc-after>
      <ChapterPager />
    </template>
  </DefaultTheme.Layout>
</template>
