<script setup lang="ts">
import { culturalCreativeCourses } from '../_shared/culturalCreative'

const futureSections = [
  {
    title: '案例集合',
    icon: '🗂️',
    description: ''
  }
]
</script>

<template>
  <div class="cc-home">
    <section class="cc-home-hero">
      <h1>文创产品策划运营</h1>
      <p>万一哪天去摆摊呢？🤭</p>
    </section>

    <section class="cc-home-layout">
      <section class="cc-home-grid">
        <article v-for="course in culturalCreativeCourses" :key="course.slug" class="cc-home-card">
          <div class="cc-home-card-head">
            <div class="cc-home-card-title">
              <span class="cc-home-card-icon">{{ course.icon }}</span>
              <div>
                <h3>
                  {{ course.title }}
                  <span class="cc-home-type-tag">课</span>
                </h3>
              </div>
            </div>
            <a :href="course.overviewLink" class="cc-home-primary">马上进入</a>
          </div>

          <p class="cc-home-intro">{{ course.intro }}</p>
        </article>

        <article v-for="item in futureSections" :key="item.title" class="cc-home-future-card">
          <div class="cc-home-future-head">
            <div class="cc-home-card-title">
              <span class="cc-home-card-icon muted">{{ item.icon }}</span>
              <div>
                <h3>{{ item.title }}</h3>
              </div>
            </div>
          </div>
        </article>
      </section>
    </section>
  </div>
</template>

<style scoped>
.cc-home {
  display: grid;
  gap: 28px;
  width: min(1240px, 100%);
  margin: 0 auto;
  padding: 20px 0 40px;
}

.cc-home-hero {
  position: relative;
  padding: 36px 40px;
  border-radius: 28px;
  border: 1px solid rgba(255, 142, 122, 0.14);
  background:
    radial-gradient(circle at top right, rgba(255, 176, 133, 0.22), transparent 24%),
    radial-gradient(circle at left bottom, rgba(255, 212, 160, 0.22), transparent 30%),
    linear-gradient(145deg, rgba(255, 250, 249, 0.96) 0%, rgba(255, 245, 242, 0.94) 100%);
  overflow: hidden;
}

.cc-home-hero h1 {
  margin: 14px 0 10px !important;
  border: 0 !important;
  font-size: 2.5rem !important;
}

.cc-home-hero p {
  margin: 0;
  max-width: 760px;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.cc-home-card h3,
.cc-home-future-card h3 {
  margin: 0 !important;
  border: 0 !important;
}

.cc-home-type-tag {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 142, 122, 0.12);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
  vertical-align: middle;
}

.cc-home-layout {
  display: grid;
}

.cc-home-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.cc-home-card,
.cc-home-future-card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 22px;
  border: 1px solid rgba(255, 142, 122, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, var(--vp-c-bg-soft) 100%);
  box-shadow: 0 12px 28px rgba(255, 142, 122, 0.06);
}

.cc-home-card-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.cc-home-card-title {
  display: flex;
  gap: 14px;
  align-items: center;
}

.cc-home-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: var(--vp-c-bg);
  font-size: 24px;
}

.cc-home-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  color: #fff !important;
  text-decoration: none !important;
  font-weight: 600;
  white-space: nowrap;
}

.cc-home-intro {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.cc-home-future-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.cc-home-card-icon.muted {
  opacity: 0.78;
}

.cc-home-future-card {
  align-content: center;
  min-height: 220px;
  background: linear-gradient(180deg, rgba(246, 246, 246, 0.92) 0%, rgba(240, 240, 240, 0.92) 100%);
  border-color: rgba(60, 60, 60, 0.08);
  box-shadow: none;
}

.dark .cc-home-card,
.dark .cc-home-hero,
.dark .cc-home-future-card {
  border-color: rgba(255, 179, 167, 0.1);
}

.dark .cc-home-card,
.dark .cc-home-future-card {
  background: linear-gradient(180deg, rgba(35, 35, 35, 0.95) 0%, var(--vp-c-bg-soft) 100%);
}

.dark .cc-home-card-icon {
  background: var(--vp-c-bg-alt);
}

.dark .cc-home-future-card {
  background: linear-gradient(180deg, rgba(44, 44, 44, 0.92) 0%, rgba(36, 36, 36, 0.92) 100%);
  border-color: rgba(255, 255, 255, 0.06);
}

@media (max-width: 959px) {
  .cc-home-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .cc-home {
    padding-top: 12px;
  }

  .cc-home-hero,
  .cc-home-card,
  .cc-home-future-card {
    padding: 20px;
  }

  .cc-home-hero h1 {
    font-size: 2rem !important;
  }

  .cc-home-card-head {
    flex-direction: column;
  }
}
</style>
