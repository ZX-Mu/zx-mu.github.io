import DefaultTheme from 'vitepress/theme'
import DocCard from './components/DocCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DocCard', DocCard)
    app.component('ProjectCard', ProjectCard)
  }
}