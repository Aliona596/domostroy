<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <div class="logo" @click="$router.push('/')">
            <img src="https://img.freepik.com/premium-vector/black-yellow-logo-with-letter-s-it_811396-2778.jpg?semt=ais_hybrid&w=740" alt="Логотип Домострой" class="logo-img">
            <span class="logo-text">ДОМОСТРОЙ</span>
          </div>
          <p class="slogan">Строительство объектов любой сложности</p>
        </div>
        
        <div class="footer-links">
          <div class="links-column">
            <h4>НАВИГАЦИЯ</h4>
            <router-link to="/">Главная</router-link>
            <router-link to="/projects">Проекты</router-link>
            <router-link to="/services">Услуги</router-link>
            <router-link to="/about">О нас</router-link>
            <router-link to="/contacts">Контакты</router-link>
          </div>
          
          <div class="links-column">
            <h4>УСЛУГИ</h4>
            <a href="#">Проектирование</a>
            <a href="#">Строительство</a>
            <a href="#">Отделка</a>
            <a href="#">Ландшафт</a>
            <a href="#">Ремонт</a>
          </div>
          
          <div class="links-column">
            <h4>КОНТАКТЫ</h4>
            <p>+7 (495) 123-45-67</p>
            <p>info@domostroy.ru</p>
            <p>г. Москва, ул. Строителей, 15</p>
            <p>Пн-Пт: 9:00 - 20:00</p>
          </div>
          
          <div class="links-column">
            <h4>СОЦСЕТИ</h4>
            <div class="social-links">
              <a href="#" class="social-link">Telegram</a>
              <a href="#" class="social-link">VK</a>
              <a href="#" class="social-link">YouTube</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>2026 ДОМОСТРОЙ. Все права защищены.</p>
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
  padding: 3rem 2rem 1rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  margin-top: 3rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Логотип в подвале */
.footer-logo {
  flex: 1;
  min-width: 250px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.logo-img {
  height: 45px;
  width: auto;
  display: block;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: white;
}

.slogan {
  color: #888;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-top: 0.5rem;
}

/* Колонки ссылок */
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  flex: 2;
  justify-content: flex-end;
}

.links-column {
  min-width: 140px;
}

.links-column h4 {
  color: #c8a45d;
  font-size: 0.85rem;
  letter-spacing: 1px;
  margin-bottom: 1.2rem;
  font-weight: 600;
}

.links-column a, 
.links-column p {
  display: block;
  color: #888;
  text-decoration: none;
  font-size: 0.85rem;
  margin-bottom: 0.7rem;
  transition: color 0.3s;
}

.links-column a:hover {
  color: #c8a45d;
}

.links-column p {
  margin-bottom: 0.7rem;
  color: #888;
}

/* Соцсети */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  display: inline-block;
  padding: 0.3rem 0;
}

/* Нижняя часть */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  color: #555;
  font-size: 0.75rem;
}

.developer {
  color: #555;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .footer-links {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1rem 1rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-links {
    justify-content: flex-start;
    gap: 2rem;
  }
  
  .footer-logo {
    text-align: center;
  }
  
  .logo {
    justify-content: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .logo-img {
    height: 35px;
  }
  
  .logo-text {
    font-size: 1.1rem;
  }
}
</style>