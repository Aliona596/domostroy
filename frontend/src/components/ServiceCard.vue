<template>
  <div class="service-card">
    <h3>{{ service.name }}</h3>
    <p>{{ service.description }}</p>
    <p class="price">{{ service.price_per_unit }} ₽ / {{ service.unit }}</p>
    <button @click="$emit('select')" class="select-btn">Выбрать</button>
  </div>
</template>
<script setup>
defineProps(['service']);
defineEmits(['select']);
</script>
<style scoped>
.service-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  width: 250px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}
.service-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
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
.select-btn:hover {
  background: #1a252f;
}
</style>