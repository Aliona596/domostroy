<template>
  <div class="projects-page">
    <div class="container">
      <h1>Наши проекты</h1>
      <div class="projects-grid">
        <div v-for="(project, i) in projects" :key="i" class="project-card">
          <div class="project-image" :style="{ backgroundImage: 'url(' + project.image + ')' }"></div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.size }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const projects = ref([
  { title: 'ДОМ С ТЕРРАСОЙ', size: '200 М²', image: 'https://i.pinimg.com/originals/8f/eb/cc/8febcc8d8569cd5c89c2c8090349259a.png?nii=t' },
  { title: 'ДОМ У ОЗЕРА', size: '350 М²', image: 'https://avatars.mds.yandex.net/i?id=4157963d5bc5e9814c090b11d1f5fc77_l-5338379-images-thumbs&n=13' },
  { title: 'ВИЛЛА', size: '500 М²', image: 'https://avatars.mds.yandex.net/i?id=c5182805a9aa423d20d8a9b07855b269be3c294a-5259939-images-thumbs&n=13' },
  { title: 'СЕМЕЙНЫЙ КОТТЕДЖ', size: '180 М²', image: 'https://avatars.mds.yandex.net/i?id=e1fb0b673db271fd683ea842884e9326_l-5222024-images-thumbs&n=13' }
])
</script>
<style scoped>
.projects-page {
  padding-top: 120px;
  min-height: 100vh;
  background: #0a0a0a;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
h1 {
  font-size: 36px;
  margin-bottom: 40px;
  text-align: center;
  color: white;
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}
.project-card {
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}
.project-card:hover {
  transform: translateY(-5px);
}
.project-image {
  height: 280px;
  background-size: cover;
  background-position: center;
}
.project-card h3 {
  padding: 15px 15px 5px;
  font-size: 18px;
  color: #c8a45d;
  text-align: center;
}
.project-card p {
  padding: 0 15px 15px;
  color: #c8a45d;
  text-align: center;
  font-weight: bold;
}
</style>