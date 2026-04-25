<template>
  <div class="catalog">
    <h1>Каталог услуг</h1>
    <div class="filters">
      <input v-model="search" placeholder="Поиск...">
      <select v-model="categoryFilter">
        <option value="">Все категории</option>
        <option value="design">Проектирование</option>
        <option value="foundation">Фундамент</option>
        <option value="walls">Стены</option>
        <option value="roof">Кровля</option>
        <option value="finishing">Отделка</option>
      </select>
    </div>
    <div class="services-list">
      <ServiceCard 
        v-for="service in filteredServices" 
        :key="service.id" 
        :service="service"
        @select="openRequestForm(service)"
      />
    </div>
    <div v-if="showForm" class="modal" @click.self="showForm = false">
      <div class="modal-content">
        <h3>Заявка на {{ selectedService?.name }}</h3>
        <input v-model="requestForm.name" placeholder="Ваше имя">
        <input v-model="requestForm.phone" placeholder="Телефон">
        <input v-model="requestForm.email" placeholder="Email (необязательно)">
        <textarea v-model="requestForm.message" placeholder="Комментарий"></textarea>
        <button @click="submitRequest">Отправить</button>
        <p v-if="requestSuccess" class="success">Заявка отправлена!</p>
        <p v-if="requestError" class="error">{{ requestError }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import ServiceCard from '../components/ServiceCard.vue'
import api from '../api'
const services = ref([])
const search = ref('')
const categoryFilter = ref('')
const showForm = ref(false)
const selectedService = ref(null)
const requestForm = ref({ name: '', phone: '', email: '', message: '' })
const requestSuccess = ref(false)
const requestError = ref('')
onMounted(async () => {
  const res = await api.get('/services')
  services.value = res.data
})
const filteredServices = computed(() => {
  return services.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = !categoryFilter.value || s.category === categoryFilter.value
    return matchesSearch && matchesCategory
  })
})
const openRequestForm = (service) => {
  selectedService.value = service
  showForm.value = true
  requestSuccess.value = false
  requestError.value = ''
}
const submitRequest = async () => {
  try {
    await api.post('/requests', {
      ...requestForm.value,
      service_id: selectedService.value.id
    })
    requestSuccess.value = true
    setTimeout(() => {
      showForm.value = false
      requestForm.value = { name: '', phone: '', email: '', message: '' }
    }, 2000)
  } catch (err) {
    requestError.value = 'Ошибка при отправке. Проверьте поля.'
  }
}
</script>
<style scoped>
.catalog {
  padding: 120px 20px 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
h1 {
  color: white;
  font-size: 32px;
  text-align: center;
}
.filters {
  display: flex;
  gap: 15px;
  margin: 30px 0;
  justify-content: center;
}
.filters input, .filters select {
  padding: 8px 12px;
  border: 1px solid #333;
  border-radius: 5px;
  background: #1a1a1a;
  color: white;
}
.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
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
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #c8a45d;
}
.modal-content h3 {
  color: #c8a45d;
  margin-bottom: 5px;
}
.modal-content input, .modal-content textarea {
  padding: 8px;
  background: #2a2a2a;
  border: 1px solid #444;
  color: white;
  border-radius: 5px;
}
.modal-content button {
  background: #c8a45d;
  color: black;
  border: none;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}
.success {
  color: #4caf50;
  text-align: center;
}
.error {
  color: #f44336;
  text-align: center;
}
</style>