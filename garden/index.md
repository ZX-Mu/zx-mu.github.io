---
layout: page
---

<div class="garden-portal">
  <div class="portal-header">
    <div class="portal-icon-bg">🪴</div>
    <h1 class="portal-title">有个后花园</h1>
    <p class="portal-subtitle">你说那儿啊？是有个后花园，我给自己留的。<br class="hide-mobile"/>遇到吱嘎吱嘎的小木门🚪，推开看看</p>
  </div>

  <div class="garden-shelf">
    <GardenCard
      title="文创入坑"
      description="偶然路过的一扇门，希望某一天门里能开出一簇簇的绣球花"
      link="/garden/cultural-creative/"
      icon="🎪"
    />
  </div>
</div>

<style scoped>
.garden-portal {
  width: 100%;
  max-width: 100%;
  padding: 24px;
  overflow: hidden;
}

/* Unified Portal Header */
.portal-header {
  position: relative;
  padding: 48px 24px;
  background: linear-gradient(145deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-alt) 100%);
  border-radius: 20px;
  margin-bottom: 32px;
  text-align: center;
  border: 1px solid rgba(255, 142, 122, 0.1);
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.portal-icon-bg {
  font-size: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.06;
  pointer-events: none;
  user-select: none;
}

.portal-title {
  position: relative;
  margin: 0 0 16px 0 !important;
  padding: 4px 16px !important;
  font-size: 2.2rem !important;
  font-weight: 800 !important;
  background: linear-gradient(120deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  line-height: 1.3;
  width: auto;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  overflow: visible;
}

.portal-subtitle {
  position: relative;
  margin: 0 auto !important;
  font-size: 1rem !important;
  color: var(--vp-c-text-2) !important;
  max-width: 500px;
  line-height: 1.7;
}

.hide-mobile {
  display: inline;
}

/* Shelf Layout - 卡片流排版 */
.garden-shelf {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  align-items: stretch;
}

/* Responsive */
@media (min-width: 960px) and (max-width: 1280px) {
  .garden-shelf {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 959px) {
  .portal-header {
    padding: 40px 20px;
  }
  
  .portal-title {
    font-size: 1.8rem !important;
  }
  
  .portal-subtitle {
    font-size: 0.95rem !important;
  }
  
  .hide-mobile {
    display: none;
  }
}

@media (max-width: 768px) {
  .garden-shelf {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 640px) {
  .portal-header {
    padding: 32px 16px;
    border-radius: 16px;
  }

  .portal-title {
    font-size: 1.6rem !important;
  }

  .portal-icon-bg {
    font-size: 80px;
  }
}

.dark .portal-header {
  background: linear-gradient(145deg, rgba(40, 40, 40, 0.6) 0%, rgba(30, 30, 30, 0.8) 100%);
  border-color: rgba(255, 179, 167, 0.1);
}
</style>
