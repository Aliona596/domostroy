<template>
  <div class="service-card" @mouseenter="animateIn" @mouseleave="animateOut">
    <div class="icon">🏠</div>
    <h3>{{ service.name }}</h3>
    <p>{{ service.description }}</p>
    <p class="price">{{ service.price_per_unit }} ₽ / {{ service.unit }}</p>
    <button @click="$emit('select')" class="select-btn">Выбрать</button>
  </div>
</template>

<script setup>
import { gsap } from 'gsap';

const props = defineProps(['service']);
const emit = defineEmits(['select']);

const animateIn = (e) => {
  gsap.to(e.currentTarget, { duration: 0.3, scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' });
};
const animateOut = (e) => {
  gsap.to(e.currentTarget, { duration: 0.3, scale: 1, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' });
};
</script>

<style scoped>
.service-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  width: 250px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
.price {
  color: #e67e22;
  font-weight: bold;
  margin: 1rem 0;
}
.select-btn {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
</style>