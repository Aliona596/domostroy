<template>
  <div class="portfolio">
    <h1>Наши объекты</h1>
    <div class="gallery">
      <div 
        v-for="(item, idx) in projects" 
        :key="idx" 
        class="gallery-item"
        @click="selectedProject = item"
      >
        <img :src="item.image" :alt="item.title" />
        <div class="overlay">{{ item.title }}</div>
      </div>
    </div>

    <!-- Модалка с деталями -->
    <div v-if="selectedProject" class="modal" @click.self="selectedProject = null">
      <div class="modal-content">
        <h2>{{ selectedProject.title }}</h2>
        <img :src="selectedProject.image" style="width: 100%; border-radius: 10px;" />
        <p>{{ selectedProject.description }}</p>
        <button @click="selectedProject = null">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const projects = ref([
  { title: 'Коттедж "Сосновый бор"', image: 'https://via.placeholder.com/300x200?text=Дом+1', description: 'Дом 250 м² с бассейном' },
  { title: 'Таунхаус "Лесной"', image: 'https://via.placeholder.com/300x200?text=Дом+2', description: '3-этажный дом с террасой' },
  { title: 'Дачный дом "Уют"', image: 'https://via.placeholder.com/300x200?text=Дом+3', description: 'Компактный дом 80 м²' }
]);
const selectedProject = ref(null);
</script>

<style scoped>
.portfolio {
  padding: 2rem;
  text-align: center;
}
.gallery {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
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
  transition: transform 0.3s;
}
.gallery-item:hover img {
  transform: scale(1.05);
}
.overlay {
  position: absolute;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
}
</style>