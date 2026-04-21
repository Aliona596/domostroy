import { createRouter, createWebHistory } from 'vue-router'

// Импорт всех страниц
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import Services from '../views/Services.vue'
import About from '../views/About.vue'
import Contacts from '../views/Contacts.vue'
import Calculator from '../views/Calculator.vue'

// Определение маршрутов
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/services', name: 'Services', component: Services },
  { path: '/about', name: 'About', component: About },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/calculator', name: 'Calculator', component: Calculator }
]

// Создание роутера
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router