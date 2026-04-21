<template>
  <header class="header">
    <div class="container">
      <div class="logo" @click="$router.push('/')">
        <img src="https://img.freepik.com/premium-vector/black-yellow-logo-with-letter-s-it_811396-2778.jpg?semt=ais_hybrid&w=740" alt="Логотип Домострой" class="logo-img">
        <span class="logo-text">ДОМОСТРОЙ</span>
      </div>     
      <nav class="nav">
        <router-link to="/">ГЛАВНАЯ</router-link>
        <router-link to="/projects">ПРОЕКТЫ</router-link>
        <router-link to="/services">УСЛУГИ</router-link>
        <router-link to="/about">О НАС</router-link>
        <router-link to="/contacts">КОНТАКТЫ</router-link>
        <router-link to="/calculator">КАЛЬКУЛЯТОР</router-link>
      </nav>
      <button class="contact-btn" @click="showModal = true">СВЯЗАТЬСЯ</button>
      <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen"></button>
    </div>
    <div class="mobile-menu" v-if="mobileMenuOpen">
      <router-link to="/" @click="mobileMenuOpen = false">ГЛАВНАЯ</router-link>
      <router-link to="/projects" @click="mobileMenuOpen = false">ПРОЕКТЫ</router-link>
      <router-link to="/services" @click="mobileMenuOpen = false">УСЛУГИ</router-link>
      <router-link to="/about" @click="mobileMenuOpen = false">О НАС</router-link>
      <router-link to="/contacts" @click="mobileMenuOpen = false">КОНТАКТЫ</router-link>
      <router-link to="/calculator" @click="mobileMenuOpen = false">КАЛЬКУЛЯТОР</router-link>
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-window">
        <button class="modal-close" @click="showModal = false">✕</button>
        <h3>Оставить заявку</h3>
        <p class="modal-subtitle">Мы свяжемся с вами в ближайшее время</p>
        
        <div class="modal-form">
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Ваше имя"
            class="modal-input"
          />
          <input 
            v-model="form.phone" 
            type="tel" 
            placeholder="Телефон"
            class="modal-input"
          />
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="Email (необязательно)"
            class="modal-input"
          />
          <button class="modal-submit" @click="submitForm">
            Отправить заявку
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'
import api from '../api'
const mobileMenuOpen = ref(false)
const showModal = ref(false)
const form = ref({ name: '', phone: '', email: '' })
const submitForm = async () => {
  if (!form.value.name || !form.value.phone) {
    alert('Пожалуйста, заполните имя и телефон')
    return
  }
  try {
    await api.post('/requests', form.value)
    showModal.value = false
    form.value = { name: '', phone: '', email: '' }
    alert('Заявка отправлена!')
  } catch (error) {
    alert('Ошибка при отправке. Попробуйте позже.')
  }
}
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.logo-img {
  height: 40px;
  width: auto;
  display: block;
}
.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: white;
}
.nav {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}
.nav a {
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 1px;
  transition: color 0.3s;
}
.nav a:hover, 
.nav a.router-link-active {
  color: #c8a45d;
}
.contact-btn {
  background: #c8a45d;
  color: #0a0a0a;
  border: none;
  padding: 0.7rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
}
.contact-btn:hover {
  background: #d4b87a;
  transform: translateY(-2px);
}
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
.mobile-menu {
  display: none;
  flex-direction: column;
  background: #0a0a0a;
  padding: 1rem 2rem;
  gap: 1rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.mobile-menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}
.modal-window {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 20px;
  width: 450px;
  max-width: 90%;
  padding: 2rem;
  position: relative;
  border: 2px solid #c8a45d;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(200, 164, 93, 0.3);
  animation: modalFadeIn 0.3s ease;
}
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.modal-window h3 {
  color: #c8a45d;
  font-size: 1.8rem;
  text-align: center;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}
.modal-subtitle {
  color: #aaa;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.modal-input {
  padding: 0.9rem 1rem;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: white;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
}
.modal-input:focus {
  outline: none;
  border-color: #c8a45d;
  background: #1a1a1a;
}
.modal-input::placeholder {
  color: #888;
}
.modal-submit {
  background: #c8a45d;
  color: #0a0a0a;
  border: none;
  padding: 1rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s;
  margin-top: 0.5rem;
}
.modal-submit:hover {
  background: #d4b87a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(200, 164, 93, 0.3);
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.modal-close:hover {
  color: #c8a45d;
  background: rgba(200, 164, 93, 0.1);
}
@media (max-width: 768px) {
  .nav, .contact-btn {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
  .mobile-menu {
    display: flex;
  }
  .logo-text {
    font-size: 1rem;
  }
  .logo-img {
    height: 30px;
  }
  .modal-window {
    width: 90%;
    padding: 1.5rem;
  } 
  .modal-window h3 {
    font-size: 1.4rem;
  }
}
</style>