<template>
  <div class="admin">
    <h1>Админ-панель</h1>
    <div v-if="!isAdmin" class="login-form">
      <div class="login-card">
        <h2>Вход в админ-панель</h2>
        <input 
          type="text" 
          v-model="loginForm.username" 
          placeholder="Логин"
          class="login-input"
        />
        <input 
          type="password" 
          v-model="loginForm.password" 
          placeholder="Пароль"
          class="login-input"
        />
        <button @click="handleLogin" class="login-btn">Войти</button>
        <p v-if="loginError" class="error">{{ loginError }}</p>
      </div>
    </div>
    <div v-else>
      <div class="tabs">
        <button @click="tab = 'services'">Услуги</button>
        <button @click="tab = 'requests'">Заявки</button>
      </div>
      <div v-if="tab === 'services'">
        <button @click="openAddModal" class="add-btn">+ Добавить услугу</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Цена</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service.id">
              <td>{{ service.id }}</td>
              <td>{{ service.name }}</td>
              <td>{{ service.price_per_unit }} руб</td>
              <td>
                <button @click="openEditModal(service)">Изменить</button>
                <button @click="deleteService(service.id)">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="tab === 'requests'">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
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
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="showModal" class="modal" @click.self="showModal = false">
        <div class="modal-content">
          <h3>{{ isEditing ? 'Редактировать' : 'Добавить' }} услугу</h3>
          <input v-model="form.name" placeholder="Название" />
          <input v-model.number="form.price_per_unit" placeholder="Цена" />
          <input v-model="form.unit" placeholder="Единица (м2, м3)" />
          <button @click="saveService">Сохранить</button>
          <button @click="showModal = false">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../api'
const authStore = useAuthStore()
const isAdmin = computed(() => authStore.isAuthenticated)
const loginForm = ref({ username: '', password: '' })
const loginError = ref('')
const tab = ref('services')
const services = ref([])
const requests = ref([])
const showModal = ref(false)
const isEditing = ref(false)
const form = ref({ name: '', price_per_unit: '', unit: '' })
const editingId = ref(null)
const handleLogin = async () => {
  loginError.value = ''
  try {
    const success = await authStore.login(loginForm.value.username, loginForm.value.password)
    if (success) {
      loginForm.value = { username: '', password: '' }
      loadServices()
      loadRequests()
    } else {
      loginError.value = 'Неверный логин или пароль'
    }
  } catch (error) {
    loginError.value = 'Ошибка подключения к серверу'
  }
}
const loadServices = async () => {
  const res = await api.get('/services')
  services.value = res.data
}
const loadRequests = async () => {
  const res = await api.get('/requests', authStore.token)
  requests.value = res.data
}
const openAddModal = () => {
  isEditing.value = false
  form.value = { name: '', price_per_unit: '', unit: '' }
  showModal.value = true
}
const openEditModal = (service) => {
  isEditing.value = true
  editingId.value = service.id
  form.value = {
    name: service.name,
    price_per_unit: service.price_per_unit,
    unit: service.unit
  }
  showModal.value = true
}
const saveService = async () => {
  if (isEditing.value) {
    await api.put(`/services/${editingId.value}`, form.value, authStore.token)
  } else {
    await api.post('/services', form.value, authStore.token)
  }
  showModal.value = false
  loadServices()
}
const deleteService = async (id) => {
  if (confirm('Удалить услугу?')) {
    await api.del(`/services/${id}`, authStore.token)
    loadServices()
  }
}
const updateStatus = async (id, status) => {
  await api.put(`/requests/${id}/status`, { status }, authStore.token)
  loadRequests()
}
onMounted(() => {
  if (isAdmin.value) {
    loadServices()
    loadRequests()
  }
})
</script>
<style scoped>
.admin {
  padding: 120px 2rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
}
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
.login-card {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  width: 350px;
  text-align: center;
  border: 1px solid #c8a45d;
}
.login-card h2 {
  color: #c8a45d;
  margin-bottom: 1.5rem;
}
.login-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: white;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
  background: #c8a45d;
  color: black;
  border: none;
  padding: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}
.login-btn:hover {
  background: #d4b87a;
}
.error {
  color: #ff6b6b;
  margin-top: 1rem;
}
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.tabs button {
  background: #2a2a2a;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}
.tabs button:hover {
  background: #c8a45d;
  color: black;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: #1a1a1a;
}
th, td {
  border: 1px solid #333;
  padding: 0.5rem;
  text-align: left;
}
th {
  background: #2a2a2a;
  color: #c8a45d;
}
h3 {
  color: #c8a45d;
}
.add-btn {
  background: #c8a45d;
  color: black;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #c8a45d;
}

.modal-content input {
  padding: 0.5rem;
  background: #fffefe;
  border: 1px solid #333;
  color: white;
  border-radius: 5px;
}
.modal-content button {
  background: #c8a45d;
  color: black;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
}
</style>