<template>
  <div class="home">
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
    <section class="projects">
      <div class="container">
        <div class="projects-header">
          <span class="section-label">НАШИ РАБОТЫ</span>
          <h2>Лучшие проекты</h2>
        </div>
        <div class="projects-grid">
          <div v-for="(project, index) in featuredProjects" :key="index" class="project-card">
            <div class="project-image" :style="{ backgroundImage: 'url(' + project.image + ')' }">
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
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">{{ stats.objets }}</span>
            <span>Построено объектов</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ stats.clients }}</span>
            <span>Довольных клиентов</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ stats.years }}</span>
            <span>Лет на рынке</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ stats.employees }}</span>
            <span>Сотрудников</span>
          </div>
        </div>
      </div>
    </section>
    <div v-if="showNoveltiesModal" class="modal" @click.self="showNoveltiesModal = false">
      <div class="modal-content">
        <h3>НОВИНКИ 2025</h3>
        <div class="modal-list">
          <div>• Система автоматизации и управления</div>
          <div>• Пассивные дома класса А+</div>
          <div>• Новая линейка экологичных материалов</div>
        </div>
        <button class="modal-close-btn" @click="showNoveltiesModal = false">Закрыть</button>
      </div>
    </div>
    <div v-if="showItemsModal" class="modal" @click.self="showItemsModal = false">
      <div class="modal-content">
        <h3>НАШИ ПРЕДМЕТЫ И УСЛУГИ</h3>
        <div class="modal-list">
          <div><strong>Строительные материалы</strong><br>• Кирпич, бетон, арматура, утеплитель</div>
          <div><strong>Отделочные материалы</strong><br>• Обои, краска, ламинат, плитка</div>
          <div><strong>Инженерные системы</strong><br>• Отопление, водоснабжение, электрика</div>
          <div><strong>Ландшафтный дизайн</strong><br>• Озеленение, дорожки, освещение</div>
        </div>
        <button class="modal-close-btn" @click="showItemsModal = false">Закрыть</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
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
const stats = ref({
  objets: 247,
  clients: 198,
  years: 10,
  employees: 35
})
const goToProducts = () => router.push('/services')
const goToContacts = () => router.push('/contacts')
const goToNovelties = () => showNoveltiesModal.value = true
const goToItems = () => showItemsModal.value = true
const openProject = (project) => {
  alert('Проект "' + project.title + '"\nПлощадь: ' + project.size)
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
  background: #0a0a0a;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.hero-content {
  max-width: 700px;
}
.hero-content h1 {
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}
.hero-content p {
  font-size: 18px;
  color: #aaa;
  margin-bottom: 30px;
}
.hero-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.btn-primary {
  background: #c8a45d;
  color: black;
  border: none;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}
.btn-outline {
  background: none;
  border: 1px solid #c8a45d;
  color: #c8a45d;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}
.projects {
  padding: 60px 0;
  background: #0a0a0a;
}
.projects-header {
  text-align: center;
  margin-bottom: 40px;
}
.section-label {
  color: #c8a45d;
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
}
.projects-header h2 {
  font-size: 32px;
  color: white;
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}
.project-card {
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}
.project-card:hover {
  transform: translateY(-5px);
}
.project-image {
  height: 280px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  opacity: 0;
}
.project-card:hover .project-overlay {
  opacity: 1;
}
.project-size {
  background: #c8a45d;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  width: fit-content;
}
.view-btn {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  width: fit-content;
}
.view-btn:hover {
  background: white;
  color: black;
}
.project-card h3 {
  padding: 15px 15px 5px;
  color: #c8a45d;
  text-align: center;
}
.project-card .project-size-text {
  padding: 0 15px 15px;
  color: white;
  text-align: center;
}
.stats {
  padding: 50px 0;
  background: #050505;
  border-top: 1px solid #1a1a1a;
  border-bottom: 1px solid #1a1a1a;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  text-align: center;
}
.stat-item .stat-number {
  font-size: 36px;
  font-weight: bold;
  color: #c8a45d;
  display: block;
}
.stat-item span:last-child {
  color: #888;
  font-size: 14px;
}
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
  z-index: 1000;
}
.modal-content {
  background: #1a1a1a;
  padding: 25px;
  border-radius: 10px;
  width: 400px;
  border: 1px solid #c8a45d;
}
.modal-content h3 {
  color: #c8a45d;
  margin-bottom: 20px;
  text-align: center;
}
.modal-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  color: #ccc;
}
.modal-list strong {
  color: #c8a45d;
}
.modal-close-btn {
  background: #c8a45d;
  color: black;
  border: none;
  padding: 10px;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 28px;
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
    padding: 8px 16px;
    font-size: 12px;
  }
}
</style>