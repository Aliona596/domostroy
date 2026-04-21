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
          <input 
            type="number" 
            v-model.number="area" 
            min="1" 
            step="10"
            placeholder="Введите площадь или объём"
          >
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
          <div class="price">{{ formatNumber(totalPrice) }} ₽</div>
          <div class="details">
            <p>Базовая цена: {{ formatNumber(basePrice) }} ₽</p>
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

// Данные формы
const selectedService = ref('500')
const area = ref(100)
const materialCoeff = ref(1)
const totalPrice = ref(0)
const basePrice = ref(0)

// Функция расчёта
const calculate = () => {
  if (!area.value || area.value <= 0) {
    alert('Введите корректный объём (площадь)')
    return
  }
  
  const pricePerUnit = parseFloat(selectedService.value)
  basePrice.value = pricePerUnit * area.value
  totalPrice.value = basePrice.value * materialCoeff.value
}

// Форматирование чисел
const formatNumber = (num) => {
  return Math.round(num).toLocaleString('ru-RU')
}

// Переход к заявке
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
  padding: 0 2rem;
}

h1 {
  font-size: 2rem;
  text-align: center;
  color: white;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #888;
  margin-bottom: 2rem;
}

.calculator-card {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #2a2a2a;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #c8a45d;
  font-weight: 600;
}

select, input {
  width: 100%;
  padding: 0.8rem;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
}

select:focus, input:focus {
  outline: none;
  border-color: #c8a45d;
}

.calc-btn {
  width: 100%;
  background: #c8a45d;
  color: #0a0a0a;
  border: none;
  padding: 1rem;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 0.5rem;
  transition: all 0.3s;
}

.calc-btn:hover {
  background: #d4b87a;
  transform: translateY(-2px);
}

.result {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #0a0a0a;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #c8a45d;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result h3 {
  color: #c8a45d;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #c8a45d;
  margin: 1rem 0;
}

.details {
  margin: 1rem 0;
  padding-top: 1rem;
  border-top: 1px solid #2a2a2a;
  color: #888;
  font-size: 0.9rem;
}

.order-btn {
  background: transparent;
  border: 1px solid #c8a45d;
  color: #c8a45d;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.order-btn:hover {
  background: #c8a45d;
  color: #0a0a0a;
}
</style>