<script setup>
defineProps({
  title: String,
  description: String,
  link: String,
  icon: String
})
</script>

<template>
  <a :href="link" class="garden-card">
    <div class="card-glass"></div>
    <div class="card-content">
      <div class="card-header">
        <span class="card-icon">{{ icon || '🌱' }}</span>
        <h2 class="card-title">{{ title }}</h2>
      </div>
      <p class="card-desc">{{ description }}</p>
    </div>
  </a>
</template>

<style scoped>
/* Card Styles - Unified with Cultural Creative Hub */
.garden-card {
  position: relative;
  border-radius: 20px;
  padding: 28px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  border: 1px solid rgba(255, 142, 122, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, var(--vp-c-bg-soft) 100%);
  box-shadow: 0 8px 24px rgba(255, 142, 122, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
}

.garden-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow:
      0 12px 32px rgba(255, 142, 122, 0.12),
      0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-glass {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);
  border-radius: 20px;
  pointer-events: none;
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.card-icon {
  font-size: 1.6rem;
  margin-right: 16px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: var(--vp-c-bg-alt);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 -1px 2px rgba(0, 0, 0, 0.02);
}

.garden-card:hover .card-icon {
  transform: scale(1.05) rotate(-2deg);
  box-shadow: 0 4px 12px rgba(255, 142, 122, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.02);
}

.card-title {
  margin: 0 !important;
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  border-bottom: none !important;
  padding-bottom: 0 !important;
  color: var(--vp-c-text-1) !important;
}

.card-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 !important;
}

/* Dark mode */
.dark .garden-card {
  background: linear-gradient(180deg, rgba(40, 40, 40, 0.92) 0%, var(--vp-c-bg-soft) 100%);
  border-color: rgba(255, 179, 167, 0.1);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
}

.dark .card-icon {
  background: var(--vp-c-bg-alt);
}

/* Responsive */
@media (max-width: 640px) {
  .garden-card {
    padding: 20px;
  }
}
</style>