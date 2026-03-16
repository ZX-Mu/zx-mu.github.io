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
        <a v-for="course in culturalCreativeCourses" :key="course.slug" :href="course.overviewLink" class="cc-home-card">
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
          </div>

          <p class="cc-home-intro">{{ course.intro }}</p>
        </a>

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
  position: relative;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 22px;
  border: 1px solid rgba(255, 142, 122, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, var(--vp-c-bg-soft) 100%);
  box-shadow: 0 12px 28px rgba(255, 142, 122, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

/* 卡片可点击样式 */
.cc-home-card {
  cursor: pointer;
  text-decoration: none !important;
  color: inherit !important;
}

/* 卡片 Hover 效果 */
.cc-home-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow:
    0 16px 40px rgba(255, 142, 122, 0.14),
    0 4px 12px rgba(0, 0, 0, 0.06);
}

/* 右下角箭头 - 默认隐藏 */
.cc-home-card::after {
  content: '→';
  position: absolute;
  right: 24px;
  bottom: 24px;
  font-size: 20px;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Hover 时显示箭头 */
.cc-home-card:hover::after {
  opacity: 0.6;
  transform: translateX(0);
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
  transition: transform 0.3s ease;
}

/* Icon hover 效果 */
.cc-home-card:hover .cc-home-card-icon {
  transform: scale(1.05);
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

/* 平板和小屏幕 - 单列布局 */
@media (max-width: 959px) {
  .cc-home-grid {
    grid-template-columns: 1fr;
  }
}

/* 手机端适配 */
@media (max-width: 640px) {
  .cc-home {
    padding: 12px 16px 32px;
    gap: 20px;
  }

  .cc-home-hero {
    padding: 24px 20px;
    border-radius: 20px;
  }

  .cc-home-hero h1 {
    font-size: 1.75rem !important;
    margin: 8px 0 8px !important;
  }

  .cc-home-hero p {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .cc-home-grid {
    gap: 14px;
  }

  .cc-home-card,
  .cc-home-future-card {
    padding: 18px;
    border-radius: 16px;
    gap: 12px;
  }

  .cc-home-card-icon {
    width: 42px;
    height: 42px;
    font-size: 22px;
    border-radius: 12px;
  }

  .cc-home-card h3,
  .cc-home-future-card h3 {
    font-size: 1.05rem !important;
  }

  .cc-home-type-tag {
    font-size: 11px;
    padding: 1px 6px;
  }

  .cc-home-intro {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .cc-home-future-card {
    min-height: 180px;
  }

  /* 移除右下角箭头在小屏幕上的显示 */
  .cc-home-card::after {
    display: none;
  }
}

/* 小尺寸手机适配 */
@media (max-width: 480px) {
  .cc-home {
    padding: 8px 12px 24px;
    gap: 16px;
  }

  .cc-home-hero {
    padding: 20px 16px;
    border-radius: 16px;
  }

  .cc-home-hero h1 {
    font-size: 1.5rem !important;
  }

  .cc-home-hero p {
    font-size: 0.9rem;
  }

  .cc-home-grid {
    gap: 12px;
  }

  .cc-home-card,
  .cc-home-future-card {
    padding: 16px;
    border-radius: 14px;
  }

  .cc-home-card-icon {
    width: 38px;
    height: 38px;
    font-size: 20px;
    border-radius: 10px;
  }

  .cc-home-card-title {
    gap: 12px;
  }

  .cc-home-card h3,
  .cc-home-future-card h3 {
    font-size: 1rem !important;
  }

  .cc-home-intro {
    font-size: 0.875rem;
  }

  .cc-home-future-card {
    min-height: 160px;
  }
}

/* 触摸设备优化 - 禁用 hover 效果 */
@media (hover: none) and (pointer: coarse) {
  .cc-home-card:hover {
    transform: none;
    border-color: rgba(255, 142, 122, 0.12);
    box-shadow: 0 12px 28px rgba(255, 142, 122, 0.06);
  }

  .cc-home-card:hover .cc-home-card-icon {
    transform: none;
  }

  .cc-home-card:hover::after {
    opacity: 0;
  }

  /* 添加触摸反馈 */
  .cc-home-card:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}
</style>
