import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import DocCard from './components/DocCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import GardenCard from './components/GardenCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DocCard', DocCard)
    app.component('ProjectCard', ProjectCard)
    app.component('GardenCard', GardenCard)
  }
}
