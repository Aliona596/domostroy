<template>
  <div class="portfolio">
    <h1>Наши объекты</h1>
    <div class="gallery">
      <div v-for="(item, idx) in projects" :key="idx" class="gallery-item" @click="selectedProject = item">
        <img :src="item.image" :alt="item.title">
        <div class="overlay">{{ item.title }}</div>
      </div>
    </div>
    <div v-if="selectedProject" class="modal" @click.self="selectedProject = null">
      <div class="modal-content">
        <h2>{{ selectedProject.title }}</h2>
        <img :src="selectedProject.image" class="modal-img">
        <p>{{ selectedProject.description }}</p>
        <button @click="selectedProject = null">Закрыть</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const projects = ref([
  { title: 'Коттедж "Сосновый бор"', image: 'https://via.placeholder.com/300x200?text=Дом+1', description: 'Дом 250 м² с бассейном' },
  { title: 'Таунхаус "Лесной"', image: 'https://via.placeholder.com/300x200?text=Дом+2', description: '3-этажный дом с террасой' },
  { title: 'Дачный дом "Уют"', image: 'https://via.placeholder.com/300x200?text=Дом+3', description: 'Компактный дом 80 м²' }
])
const selectedProject = ref(null)
</script>
<style scoped>
.portfolio {
  padding-top: 100px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  text-align: center;
  background: #0a0a0a;
  min-height: 100vh;
}
.portfolio h1 {
  color: white;
  font-size: 32px;
  margin-bottom: 20px;
}
.gallery {
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
}
.gallery-item {
  position: relative;
  width: 300px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
}
.gallery-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s;
}
.gallery-item:hover img {
  transform: scale(1.05);
}
.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 16px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: #1a1a1a;
  padding: 25px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  border: 1px solid #c8a45d;
}
.modal-content h2 {
  color: #c8a45d;
  margin-bottom: 15px;
}
.modal-img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}
.modal-content p {
  color: #ccc;
  margin-bottom: 20px;
}
.modal-content button {
  background: #c8a45d;
  color: black;
  border: none;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}
.modal-content button:hover {
  background: #d4b87a;
}
</style>