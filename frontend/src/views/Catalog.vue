<template>
  <div class="catalog">
    <h1>Каталог услуг</h1>
    <div class="filters">
      <input v-model="search" placeholder="Поиск..." />
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

    <!-- Форма заявки -->
    <div v-if="showForm" class="modal" @click.self="showForm = false">
      <div class="modal-content">
        <h3>Заявка на {{ selectedService?.name }}</h3>
        <input v-model="requestForm.name" placeholder="Ваше имя" />
        <input v-model="requestForm.phone" placeholder="Телефон" />
        <input v-model="requestForm.email" placeholder="Email (необязательно)" />
        <textarea v-model="requestForm.message" placeholder="Комментарий"></textarea>
        <button @click="submitRequest">Отправить</button>
        <p v-if="requestSuccess" class="success">✅ Заявка отправлена!</p>
        <p v-if="requestError" class="error">{{ requestError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ServiceCard from '../components/ServiceCard.vue';
import api from '../api';

const services = ref([]);
const search = ref('');
const categoryFilter = ref('');
const showForm = ref(false);
const selectedService = ref(null);
const requestForm = ref({ name: '', phone: '', email: '', message: '' });
const requestSuccess = ref(false);
const requestError = ref('');

onMounted(async () => {
  const res = await api.get('/services');
  services.value = res.data;
});

const filteredServices = computed(() => {
  return services.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory = !categoryFilter.value || s.category === categoryFilter.value;
    return matchesSearch && matchesCategory;
  });
});

const openRequestForm = (service) => {
  selectedService.value = service;
  showForm.value = true;
  requestSuccess.value = false;
  requestError.value = '';
};

const submitRequest = async () => {
  try {
    await api.post('/requests', {
      ...requestForm.value,
      service_id: selectedService.value.id
    });
    requestSuccess.value = true;
    setTimeout(() => {
      showForm.value = false;
      requestForm.value = { name: '', phone: '', email: '', message: '' };
    }, 2000);
  } catch (err) {
    requestError.value = 'Ошибка при отправке. Проверьте поля.';
  }
};
</script>

<style scoped>
.catalog {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.filters {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}
.filters input, .filters select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>