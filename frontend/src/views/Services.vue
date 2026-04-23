<template>
  <div class="services-page">
    <div class="container">
      <h1>Наши продукты и услуги</h1>
      <div class="services-grid">
        <div class="service-card" v-for="s in services" :key="s.name">
          <div class="service-image">
            <img :src="s.image" :alt="s.name">
          </div>
          <h3>{{ s.name }}</h3>
          <p>{{ s.desc }}</p>
          <div class="price">{{ s.price }}</div>
          <button class="service-btn" @click="goToContact(s)">Узнать цену</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const services = [
  {
    name: 'Проектирование',
    image: 'https://miringgroup.com/wp-content/uploads/2024/08/architectural-project-review-stockcake.jpg',
    desc: 'Индивидуальные проекты любой сложности',
    price: 'от 500 ₽/м²'
  },
  {
    name: 'Строительство домов',
    image: 'https://avatars.mds.yandex.net/get-ydo/3912055/2a0000018dfdc295176c819fbf18c03b6f72/diploma',
    desc: 'Полный цикл строительства "под ключ"',
    price: 'от 35 000 ₽/м²'
  },
  {
    name: 'Фундамент',
    image: 'https://azbuka-doma.ru/upload/iblock/731/9bda84d9kvut9a49gmjrvn443y8kb5ky.jpg',
    desc: 'Ленточный, плитный, свайный',
    price: 'от 4 500 ₽/м³'
  },
  {
    name: 'Кровля',
    image: 'https://media.istockphoto.com/id/2175704098/ru/фото/силуэты-крыш-современных-домов-выделяются-на-фоне-безмятежного-вечернего-неба-подчеркивая-их.jpg?s=612x612&w=0&k=20&c=hhXAzkQQ-hoTj2qk8IG8zJoe1DyFyAU9jg_OZ6PONGA=',
    desc: 'Металлочерепица, мягкая кровля',
    price: 'от 2 800 ₽/м²'
  },
  {
    name: 'Отделка',
    image: 'https://i.pinimg.com/originals/d8/68/39/d868393f6af6777e0bbfb5ab14aa451c.jpg?nii=t',
    desc: 'Внутренняя и внешняя отделка',
    price: 'от 2 500 ₽/м²'
  },
  {
    name: 'Ландшафт',
    image: 'https://i.pinimg.com/originals/37/ca/92/37ca92ec340247b57b15eaa9e53addf2.jpg?nii=t',
    desc: 'Ландшафтный дизайн и благоустройство',
    price: 'договорная'
  }
]
const goToContact = () => {
  router.push('/contacts')
}
</script>
<style scoped>
.services-page {
  padding-top: 120px;
  min-height: 100vh;
  background: #0a0a0a;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: white;
}
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}
.service-card {
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
}
.service-card:hover {
  transform: translateY(-5px);
}
.service-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.service-card h3 {
  padding: 15px 15px 5px;
  margin: 0;
  color: #c8a45d;
  font-size: 20px;
}
.service-card p {
  padding: 0 15px;
  color: #aaa;
  font-size: 14px;
  line-height: 1.4;
}
.price {
  padding: 8px 15px;
  color: #c8a45d;
  font-weight: bold;
  font-size: 16px;
}
.service-btn {
  margin: 0 15px 20px 15px;
  background: #c8a45d;
  color: black;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  width: calc(100% - 30px);
}
.service-btn:hover {
  background: #d4b87a;
}
</style>