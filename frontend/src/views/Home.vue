<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Строительство объектов<br>любой сложности</h1>
          <p>Мы предоставляем большой спектр услуг, от строительства частных домов<br>до постройки особняков и ландшафтного проектирования.</p>
          
          <div class="hero-buttons">
            <button class="btn-primary" @click="goToProducts">ПРОДУКТЫ</button>
            <button class="btn-outline" @click="goToContacts">КОНТАКТЫ</button>
            <button class="btn-outline" @click="goToNovelties">НОВИНКИ</button>
            <button class="btn-outline" @click="goToItems">ПРЕДМЕТЫ</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="projects">
      <div class="container">
        <div class="projects-header">
          <span class="section-label">НАШИ РАБОТЫ</span>
          <h2>Лучшие проекты</h2>
        </div>
        
        <div class="projects-grid">
          <div 
            v-for="(project, index) in featuredProjects" 
            :key="index"
            class="project-card"
          >
            <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }">
              <div class="project-overlay">
                <span class="project-size">{{ project.size }}</span>
                <button class="view-btn" @click="openProject(project)">Открыть веб-сайт →</button>
              </div>
            </div>
            <h3>{{ project.title }}</h3>
            <p class="project-size-text">{{ project.size }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number" ref="stat1">{{ stats.objets }}</span>
            <span>Построено объектов</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" ref="stat2">{{ stats.clients }}</span>
            <span>Довольных клиентов</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" ref="stat3">{{ stats.years }}</span>
            <span>Лет на рынке</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" ref="stat4">{{ stats.employees }}</span>
            <span>Сотрудников</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal для новинок -->
    <div v-if="showNoveltiesModal" class="modal" @click.self="showNoveltiesModal = false">
      <div class="modal-content simple-modal">
        <h3>НОВИНКИ 2025</h3>
        <div class="simple-list">
          <div class="list-item">• Система автоматизации и управления</div>
          <div class="list-item">• Пассивные дома класса А+</div>
          <div class="list-item">• Новая линейка экологичных материалов</div>
        </div>
        <button class="close-modal" @click="showNoveltiesModal = false">Закрыть</button>
      </div>
    </div>

    <!-- Modal для предметов/услуг -->
    <div v-if="showItemsModal" class="modal" @click.self="showItemsModal = false">
      <div class="modal-content simple-modal">
        <h3>НАШИ ПРЕДМЕТЫ И УСЛУГИ</h3>
        <div class="simple-list">
          <div class="list-category">
            <strong>Строительные материалы</strong>
            <div class="sub-items">• Кирпич, бетон, арматура, утеплитель</div>
          </div>
          <div class="list-category">
            <strong>Отделочные материалы</strong>
            <div class="sub-items">• Обои, краска, ламинат, плитка</div>
          </div>
          <div class="list-category">
            <strong>Инженерные системы</strong>
            <div class="sub-items">• Отопление, водоснабжение, электрика</div>
          </div>
          <div class="list-category">
            <strong>Ландшафтный дизайн</strong>
            <div class="sub-items">• Озеленение, дорожки, освещение</div>
          </div>
        </div>
        <button class="close-modal" @click="showItemsModal = false">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const featuredProjects = ref([
  { title: 'ДОМ С ТЕРРАСОЙ', size: '200 М²', image: 'https://i.pinimg.com/originals/8f/eb/cc/8febcc8d8569cd5c89c2c8090349259a.png?nii=t' },
  { title: 'ДОМ У ОЗЕРА', size: '350 М²', image: 'https://avatars.mds.yandex.net/i?id=4157963d5bc5e9814c090b11d1f5fc77_l-5338379-images-thumbs&n=13' },
  { title: 'ВИЛЛА', size: '500 М²', image: 'https://avatars.mds.yandex.net/i?id=c5182805a9aa423d20d8a9b07855b269be3c294a-5259939-images-thumbs&n=13' },
  { title: 'СЕМЕЙНЫЙ КОТТЕДЖ', size: '180 М²', image: 'https://avatars.mds.yandex.net/i?id=e1fb0b673db271fd683ea842884e9326_l-5222024-images-thumbs&n=13' }
])

const showNoveltiesModal = ref(false)
const showItemsModal = ref(false)

// Статические цифры (без анимации, просто для отображения)
const stats = ref({
  objets: 247,
  clients: 198,
  years: 10,
  employees: 35
})

// Функции для кнопок
const goToProducts = () => router.push('/services')
const goToContacts = () => router.push('/contacts')
const goToNovelties = () => showNoveltiesModal.value = true
const goToItems = () => showItemsModal.value = true

const openProject = (project) => {
  alert(`Проект "${project.title}"\nПлощадь: ${project.size}`)
}
</script>

<style scoped>
.home {
  padding-top: 80px;
}

.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.hero-content {
  max-width: 800px;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #fff 0%, #c8a45d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-content p {
  font-size: 1.1rem;
  color: #aaa;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: #c8a45d;
  color: #0a0a0a;
  border: none;
  padding: 0.9rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
}

.btn-primary:hover {
  background: #d4b87a;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 1px solid #c8a45d;
  color: #c8a45d;
  padding: 0.9rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
}

.btn-outline:hover {
  background: rgba(200, 164, 93, 0.1);
  transform: translateY(-2px);
}

.projects {
  padding: 5rem 0;
  background: #0a0a0a;
}

.projects-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-label {
  color: #c8a45d;
  font-size: 0.85rem;
  letter-spacing: 3px;
  display: block;
  margin-bottom: 1rem;
}

.projects-header h2 {
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-size {
  align-self: flex-start;
  background: #c8a45d;
  color: #0a0a0a;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 5px;
}

.view-btn {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  width: fit-content;
  border-radius: 5px;
}

.view-btn:hover {
  background: white;
  color: #0a0a0a;
}

.project-card h3 {
  padding: 1rem 1rem 0.5rem;
  font-size: 1.1rem;
  letter-spacing: 2px;
  color: #c8a45d;
  text-align: center;
  margin: 0;
}

.project-card .project-size-text {
  padding: 0 1rem 1rem;
  font-size: 1rem;
  color: #ffffff;
  text-align: center;
  font-weight: 500;
  margin: 0;
}

.stats {
  padding: 4rem 0;
  background: #050505;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item .stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #c8a45d;
}

.stat-item span:last-child {
  color: #888;
  font-size: 0.9rem;
}

/* Модальные окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.simple-modal {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  width: 450px;
  max-width: 90%;
  border: 1px solid #c8a45d;
}

.simple-modal h3 {
  color: #c8a45d;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
}

.simple-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.list-item {
  color: #ffffff;
  font-size: 0.95rem;
  line-height: 1.4;
  padding: 0.2rem 0;
}

.list-category {
  margin-bottom: 0.5rem;
}

.list-category strong {
  color: #c8a45d;
  display: block;
  margin-bottom: 0.3rem;
  font-size: 1rem;
}

.sub-items {
  color: #cccccc;
  font-size: 0.9rem;
  padding-left: 0.5rem;
}

.close-modal {
  background: #c8a45d;
  color: #0a0a0a;
  border: none;
  padding: 0.7rem;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.close-modal:hover {
  background: #d4b87a;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .btn-primary, .btn-outline {
    padding: 0.7rem 1.2rem;
    font-size: 0.85rem;
  }
  
  .simple-modal {
    width: 90%;
    padding: 1.5rem;
  }
}
</style>