---
layout: page
---

<div class="docs-portal">
  <div class="portal-header">
    <div class="portal-icon-bg">🏕️</div>
    <h1 class="portal-title">实验田成果展</h1>
    <p class="portal-subtitle">实验田就是用来折腾的，不信你看，下面什么五花八门的东西都有 😌<br class="hide-mobile"/>走过路过，看两眼，打个卡啥的 📸</p>
  </div>

  <div class="card-grid">
    <ProjectCard
      title="拼豆图纸生成器"
      description="拼拼豆豆，你给我一张图，我给你一张图纸"
      link="https://github.com/ZX-Mu/PerlerPix"
      preview="https://zx-mu.github.io/PerlerPix"
      icon="👾"
      tag="工具"
    />
    
  </div>
</div>

<style scoped>
.docs-portal {
  width: 100%;
  max-width: 100%;
  padding: 24px;
  overflow: hidden; /* Prevent any horizontal overflow */
}

.portal-header {
  position: relative;
  padding: 48px 24px;
  background: linear-gradient(145deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-alt) 100%);
  border-radius: 20px;
  margin-bottom: 32px;
  text-align: center;
  border: 1px solid rgba(255, 142, 122, 0.1);
  overflow: visible;
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
  background: linear-gradient(120deg, #ff8e7a 0%, #ffb085 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  line-height: 1.3; 
  width: auto;
  /* 防止文字被裁剪的关键属性 */
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

.card-grid {
  display: grid;
  /* Use explicit column counts for better control */
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

/* Large screens with sidebar - 2 columns */
@media (min-width: 960px) and (max-width: 1280px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Medium screens - 2 columns */
@media (max-width: 959px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
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

/* Small screens - 1 column */
@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  
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

/* Extra large screens - 3 columns */
@media (min-width: 1281px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}
</style>