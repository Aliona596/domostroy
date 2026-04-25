<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo" @click="$router.push('/')">
            <img src="https://img.freepik.com/premium-vector/black-yellow-logo-with-letter-s-it_811396-2778.jpg?semt=ais_hybrid&w=740" alt="Логотип">
            <span>ДОМОСТРОЙ</span>
          </div>
          <p>Строительство объектов любой сложности</p>
        </div>
        <div class="footer-menu">
          <div>
            <h4>НАВИГАЦИЯ</h4>
            <router-link to="/">Главная</router-link>
            <router-link to="/projects">Проекты</router-link>
            <router-link to="/services">Услуги</router-link>
            <router-link to="/about">О нас</router-link>
            <router-link to="/contacts">Контакты</router-link>
          </div>
          <div>
            <h4>УСЛУГИ</h4>
            <a href="#">Проектирование</a>
            <a href="#">Строительство</a>
            <a href="#">Отделка</a>
            <a href="#">Ландшафт</a>
          </div>
          <div>
            <h4>КОНТАКТЫ</h4>
            <p>+7 (495) 123-45-67</p>
            <p>info@domostroy.ru</p>
            <p>Москва, ул. Строителей, 15</p>
          </div>
          <div>
            <h4>СОЦСЕТИ</h4>
            <a href="#">Telegram</a>
            <a href="#">VK</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 ДОМОСТРОЙ. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style scoped>
.footer {
  background: #050505;
  padding: 40px 20px 20px;
  border-top: 1px solid #1a1a1a;
  margin-top: 40px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
}
.footer-brand {
  flex: 1;
  min-width: 200px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}
.logo img {
  height: 40px;
}
.logo span {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}
.footer-brand p {
  color: #888;
  font-size: 0.85rem;
}
.footer-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.footer-menu div {
  min-width: 120px;
}
.footer-menu h4 {
  color: #c8a45d;
  font-size: 0.85rem;
  margin-bottom: 15px;
}
.footer-menu a, .footer-menu p {
  display: block;
  color: #888;
  text-decoration: none;
  font-size: 0.85rem;
  margin-bottom: 8px;
}
.footer-menu a:hover {
  color: #c8a45d;
}
.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #1a1a1a;
  color: #555;
  font-size: 0.75rem;
}
@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    text-align: center;
  }
  .logo {
    justify-content: center;
  }
  
  .footer-menu {
    justify-content: center;
    text-align: center;
  }
}
</style>