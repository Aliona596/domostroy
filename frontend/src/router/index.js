import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import Services from '../views/Services.vue'
import About from '../views/About.vue'
import Contacts from '../views/Contacts.vue'
import Calculator from '../views/Calculator.vue'
import Admin from '../views/Admin.vue'  
const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/services', component: Services },
  { path: '/about', component: About },
  { path: '/contacts', component: Contacts },
  { path: '/calculator', component: Calculator },
  { path: '/admin', component: Admin }  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router