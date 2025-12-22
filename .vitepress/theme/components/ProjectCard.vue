<script setup>
defineProps({
  title: String,
  description: String,
  link: String,
  preview: String,
  icon: String,
  tag: String
})
</script>

<template>
  <a :href="preview" target="_blank" class="project-card">
    <div class="card-inner">
      <div class="card-header">
        <div class="icon-wrapper">
          <span class="icon">{{ icon || '🍊' }}</span>
        </div>
        <span v-if="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="card-body">
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
      </div>
      <div class="card-footer">
        <a :href="link" target="_blank" class="read-more">
          <span class="read-more-text">查看源码</span>
          <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
<!--        <span class="read-more">-->
<!--          -->
<!--        </span>-->
      </div>
    </div>
    <div class="card-glow"></div>
  </a>
</template>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Critical for preventing overflow in grid */
  text-decoration: none !important;
  outline: none;
}

.card-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(255, 142, 122, 0.12);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  opacity: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 142, 122, 0.15) 0%, transparent 70%);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.project-card:hover .card-inner {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow:
      0 8px 24px rgba(255, 142, 122, 0.12),
      0 2px 8px rgba(0, 0, 0, 0.04);
  background: var(--vp-c-bg);
}

.project-card:hover .card-glow {
  opacity: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
}

.icon-wrapper {
  flex-shrink: 0;
}

.icon {
  font-size: 26px;
  background: linear-gradient(135deg, #fff 0%, var(--vp-c-bg-alt) 100%);
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.04),
      inset 0 -1px 2px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover .icon {
  transform: scale(1.05) rotate(-2deg);
  box-shadow:
      0 4px 12px rgba(255, 142, 122, 0.15),
      inset 0 -1px 2px rgba(0, 0, 0, 0.02);
}

.tag {
  flex-shrink: 0;
  font-size: 11px;
  padding: 5px 12px;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  color: #fff;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.card-body {
  flex: 1;
  min-width: 0; /* Prevent text overflow */
}

.title {
  margin: 0 0 10px 0 !important;
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  color: var(--vp-c-text-1) !important;
  line-height: 1.4 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description {
  margin: 0 !important;
  font-size: 0.875rem !important;
  color: var(--vp-c-text-2) !important;
  line-height: 1.6 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
  padding-top: 16px;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  transition: gap 0.3s ease;
}

.read-more-text {
  position: relative;
}

.read-more-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.project-card:hover .read-more-text::after {
  width: 100%;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.project-card:hover .read-more {
  gap: 10px;
}

.project-card:hover .arrow-icon {
  transform: translateX(2px);
}

/* Dark mode adjustments */
.dark .card-inner {
  background: var(--vp-c-bg-soft);
  border-color: rgba(255, 142, 122, 0.08);
}

.dark .project-card:hover .card-inner {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-brand-1);
}

.dark .icon {
  background: linear-gradient(135deg, var(--vp-c-bg-alt) 0%, var(--vp-c-bg) 100%);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .card-inner {
    padding: 20px;
  }

  .icon {
    width: 46px;
    height: 46px;
    font-size: 22px;
  }

  .title {
    font-size: 1.05rem !important;
  }

  .description {
    font-size: 0.825rem !important;
    -webkit-line-clamp: 3;
  }
}
</style>