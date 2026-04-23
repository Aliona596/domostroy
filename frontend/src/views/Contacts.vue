<template>
  <div class="contacts-page">
    <div class="container">
      <h1>Контакты</h1>
      <div class="contacts-grid">
        <div class="contact-info">
          <h2>Свяжитесь с нами</h2>
          <div class="info-item">
            <div>
              <strong>Телефон</strong>
              <p>+7 (495) 123-45-67</p>
            </div>
          </div>
          <div class="info-item">
            <div>
              <strong>Email</strong>
              <p>info@domostroy.ru</p>
            </div>
          </div>
          <div class="info-item">
            <div>
              <strong>Адрес</strong>
              <p>г. Москва, ул. Строителей, 15</p>
            </div>
          </div>
          <div class="info-item">
            <div>
              <strong>Режим работы</strong>
              <p>Пн-Пт: 9:00 - 20:00<br>Сб: 10:00 - 18:00</p>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <h2>Оставить заявку</h2>
          <form @submit.prevent="submitForm">
            <input v-model="form.name" type="text" placeholder="Ваше имя" required>
            <input v-model="form.phone" type="tel" placeholder="Телефон" required>
            <input v-model="form.email" type="email" placeholder="Email">
            <textarea v-model="form.message" placeholder="Сообщение" rows="4"></textarea>
            <button type="submit">Отправить</button>
          </form>
          <p v-if="success" class="success">Заявка отправлена.Ожидайте ответа!</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import api from '../api'
const form = ref({ name: '', phone: '', email: '', message: '' })
const success = ref(false)
const submitForm = async () => {
  try {
    await api.post('/requests', form.value)
    success.value = true
    form.value = { name: '', phone: '', email: '', message: '' }
    setTimeout(() => { success.value = false }, 3000)
  } catch (err) {
    alert('Ошибка отправки')
  }
}
</script>
<style scoped>
.contacts-page {
  padding-top: 120px;
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  color: #dacc82;
}
h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #c8a45d;
}
.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}
.contact-info, .contact-form {
  background: #1a1a1a;
  border-radius: 20px;
  padding: 2rem;
}
.contact-info h2, .contact-form h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #c8a45d;
}
.info-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.info-item span {
  font-size: 1.5rem;
}
.info-item strong {
  display: block;
  margin-bottom: 0.25rem;
}
.info-item p {
  color: #c8a45d;
}
.contact-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.contact-form input, .contact-form textarea {
  padding: 0.75rem;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  font-family: inherit;
}
.contact-form button {
  background: #c8a45d;
  color: #0a0a0a;
  border: none;
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
}
.contact-form button:hover {
  background: #d4b87a;
}
.success {
  margin-top: 1rem;
  color: #4caf50;
  text-align: center;
}
@media (max-width: 768px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }
  h1 { font-size: 2rem; }
}
</style>