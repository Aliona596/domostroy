<template>
  <div class="calculator-page">
    <div class="container">
      <h1>Калькулятор сметы</h1>
      <p class="subtitle">Рассчитайте примерную стоимость строительства</p>
      <div class="calculator-card">
        <div class="form-group">
          <label>Тип работ</label>
          <select v-model="selectedService">
            <option value="500">Проектирование — 500 ₽/м²</option>
            <option value="4500">Фундамент — 4 500 ₽/м³</option>
            <option value="3500">Стены — 3 500 ₽/м²</option>
            <option value="2800">Кровля — 2 800 ₽/м²</option>
            <option value="2500">Отделка — 2 500 ₽/м²</option>
            <option value="2000">Ландшафт — 2 000 ₽/м²</option>
          </select>
        </div>
        <div class="form-group">
          <label>Объём (м² или м³)</label>
          <input type="number" v-model.number="area" min="1" step="10" placeholder="Введите площадь или объём">
        </div>
        <div class="form-group">
          <label>Качество материалов</label>
          <select v-model="materialCoeff">
            <option value="0.8">Эконом (скидка 20%)</option>
            <option value="1">Стандарт</option>
            <option value="1.3">Премиум (+30%)</option>
          </select>
        </div>
        <button class="calc-btn" @click="calculate">Рассчитать стоимость</button>
        <div v-if="totalPrice > 0" class="result">
          <h3>Итоговая стоимость:</h3>
          <div class="price">{{ totalPrice }} ₽</div>
          <div class="details">
            <p>Базовая цена: {{ basePrice }} ₽</p>
            <p>Коэффициент материалов: x{{ materialCoeff }}</p>
            <p>Объём работ: {{ area }} м²</p>
          </div>
          <button class="order-btn" @click="orderNow">Оставить заявку</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const selectedService = ref('500')
const area = ref(100)
const materialCoeff = ref(1)
const totalPrice = ref(0)
const basePrice = ref(0)
const calculate = () => {
  if (area.value <= 0) {
    alert('Введите площадь')
    return
  }
  basePrice.value = selectedService.value * area.value
  totalPrice.value = basePrice.value * materialCoeff.value
}
const orderNow = () => {
  router.push('/contacts')
}
</script>
<style scoped>
.calculator-page {
  padding-top: 120px;
  min-height: 100vh;
  background: #0a0a0a;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}
h1 {
  font-size: 28px;
  text-align: center;
  color: white;
}
.subtitle {
  text-align: center;
  color: #888;
  margin-bottom: 30px;
}
.calculator-card {
  background: #1a1a1a;
  padding: 25px;
  border-radius: 10px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  color: #c8a45d;
  font-weight: bold;
}
select, input {
  width: 100%;
  padding: 10px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}
.calc-btn {
  width: 100%;
  background: #c8a45d;
  color: black;
  border: none;
  padding: 12px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}
.calc-btn:hover {
  background: #d4b87a;
}
.result {
  margin-top: 20px;
  padding: 20px;
  background: #0a0a0a;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #c8a45d;
}
.result h3 {
  color: #c8a45d;
  margin-bottom: 10px;
}
.price {
  font-size: 32px;
  font-weight: bold;
  color: #c8a45d;
  margin: 15px 0;
}
.details {
  margin: 15px 0;
  padding-top: 10px;
  border-top: 1px solid #333;
  color: #888;
  font-size: 14px;
}
.order-btn {
  background: none;
  border: 1px solid #c8a45d;
  color: #c8a45d;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 5px;
}
.order-btn:hover {
  background: #c8a45d;
  color: black;
}
</style>