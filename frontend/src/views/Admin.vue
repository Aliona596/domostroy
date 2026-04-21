<template>
  <div class="admin">
    <h1>Админ-панель</h1>
    <div v-if="!isAdmin">
      <p>Доступ запрещен. Войдите как администратор.</p>
    </div>
    <div v-else>
      <div class="tabs">
        <button @click="tab = 'services'">Услуги</button>
        <button @click="tab = 'requests'">Заявки</button>
      </div>

      <!-- Управление услугами -->
      <div v-if="tab === 'services'">
        <button @click="editing = {}; showServiceModal = true" class="add-btn">+ Добавить услугу</button>
        <table>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.id }}</td>
            <td>{{ service.name }}</td>
            <td>{{ service.price_per_unit }} ₽</td>
            <td>
              <button @click="editService(service)">✏️</button>
              <button @click="deleteService(service.id)">❌</button>
            </td>
          </tr>
        </table>
      </div>

      <!-- Заявки -->
      <div v-if="tab === 'requests'">
        <table>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
          <tr v-for="req in requests" :key="req.id">
            <td>{{ req.id }}</td>
            <td>{{ req.name }}</td>
            <td>{{ req.phone }}</td>
            <td>
              <select :value="req.status" @change="updateStatus(req.id, $event.target.value)">
                <option value="new">Новая</option>
                <option value="in_progress">В работе</option>
                <option value="completed">Выполнена</option>
              </select>
            </td>
            <td>—</td>
          </tr>
        </table>
      </div>

      <!-- Модалка добавления/редактирования услуги -->
      <div v-if="showServiceModal" class="modal">
        <div class="modal-content">
          <h3>{{ editing.id ? 'Редактировать' : 'Добавить' }} услугу</h3>
          <input v-model="form.name" placeholder="Название" />
          <textarea v-model="form.description" placeholder="Описание"></textarea>
          <input v-model.number="form.price_per_unit" placeholder="Цена за ед." />
          <input v-model="form.unit" placeholder="Ед. измерения (м², м³)" />
          <input v-model="form.category" placeholder="Категория" />
          <button @click="saveService">Сохранить</button>
          <button @click="showServiceModal = false">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import api from '../api';

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.isAuthenticated);
const tab = ref('services');
const services = ref([]);
const requests = ref([]);
const showServiceModal = ref(false);
const editing = ref({});
const form = ref({ name: '', description: '', price_per_unit: 0, unit: '', category: '' });

const loadServices = async () => {
  const res = await api.get('/services');
  services.value = res.data;
};

const loadRequests = async () => {
  const res = await api.get('/requests', authStore.token);
  requests.value = res.data;
};

const editService = (service) => {
  editing.value = service;
  form.value = { ...service };
  showServiceModal.value = true;
};

const saveService = async () => {
  if (editing.value.id) {
    await api.put(`/services/${editing.value.id}`, form.value, authStore.token);
  } else {
    await api.post('/services', form.value, authStore.token);
  }
  showServiceModal.value = false;
  loadServices();
};

const deleteService = async (id) => {
  if (confirm('Удалить услугу?')) {
    await api.del(`/services/${id}`, authStore.token);
    loadServices();
  }
};

const updateStatus = async (id, status) => {
  await api.put(`/requests/${id}/status`, { status }, authStore.token);
  loadRequests();
};

onMounted(() => {
  if (isAdmin.value) {
    loadServices();
    loadRequests();
  }
});
</script>

<style scoped>
.admin {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}
.add-btn {
  background: green;
  color: white;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
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
</style>