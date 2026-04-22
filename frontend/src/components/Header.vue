<template>
  <header class="header">
    <div class="container">
      <div class="logo" @click="$router.push('/')">
        <img src="https://img.freepik.com/premium-vector/black-yellow-logo-with-letter-s-it_811396-2778.jpg?semt=ais_hybrid&w=740" alt="Логотип" class="logo-img">
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
      <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">☰</button>
    </div>
    <div class="mobile-menu" v-if="mobileMenuOpen">
      <router-link to="/" @click="mobileMenuOpen = false">ГЛАВНАЯ</router-link>
      <router-link to="/projects" @click="mobileMenuOpen = false">ПРОЕКТЫ</router-link>
      <router-link to="/services" @click="mobileMenuOpen = false">УСЛУГИ</router-link>
      <router-link to="/about" @click="mobileMenuOpen = false">О НАС</router-link>
      <router-link to="/contacts" @click="mobileMenuOpen = false">КОНТАКТЫ</router-link>
      <router-link to="/calculator" @click="mobileMenuOpen = false">КАЛЬКУЛЯТОР</router-link>
    </div>
    <div v-if="showModal" class="modal" @click.self="showModal = false">
      <div class="modal-content">
        <button class="close" @click="showModal = false">×</button>
        <h3>Оставить заявку</h3>
        <input v-model="form.name" type="text" placeholder="Ваше имя" />
        <input v-model="form.phone" type="tel" placeholder="Телефон" />
        <input v-model="form.email" type="email" placeholder="Email" />
        <button @click="submitForm">Отправить</button>
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
    alert('Заполните имя и телефон')
    return
  }
  try {
    await api.post('/requests', form.value)
    showModal.value = false
    form.value = { name: '', phone: '', email: '' }
    alert('Заявка отправлена!')
  } catch (error) {
    alert('Ошибка отправки')
  }
}
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #0a0a0a;
  border-bottom: 1px solid #333;
  z-index: 1000;
}
.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px 20px;
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
  height: 35px;
  width: auto;
}
.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  font-family: Arial, sans-serif;
}
.nav {
  display: flex;
  gap: 25px;
  align-items: center;
}
.nav a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-family: Arial, sans-serif;
  transition: color 0.2s;
}
.nav a:hover {
  color: #c8a45d;
}
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
.mobile-menu {
  display: none;
  flex-direction: column;
  background: #0a0a0a;
  padding: 15px 20px;
  gap: 10px;
  border-top: 1px solid #333;
}
.mobile-menu a {
  color: white;
  text-decoration: none;
  padding: 8px 0;
  font-family: Arial, sans-serif;
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
  z-index: 2000;
}
.modal-content {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.modal-content input {
  padding: 8px;
  background: #2a2a2a;
  border: 1px solid #444;
  color: white;
  border-radius: 4px;
}
.modal-content button {
  background: #c8a45d;
  color: #000;
  border: none;
  padding: 8px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}
.close {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none !important;
  color: #aaa !important;
  font-size: 20px;
  padding: 0 !important;
  width: auto !important;
}
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
  .mobile-menu {
    display: flex;
  }
  .logo-text {
    font-size: 14px;
  }
  .logo-img {
    height: 25px;
  }
  .modal-content {
    width: 85%;
  }
}
</style>