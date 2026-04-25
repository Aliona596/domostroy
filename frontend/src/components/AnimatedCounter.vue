<template>
  <span class="counter">{{ displayValue }}</span>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  target: Number,
  duration: { type: Number, default: 2 }
})
const displayValue = ref(0)
onMounted(() => {
  let start = 0
  const end = props.target
  const steps = 60
  const increment = end / steps
  let current = 0
  let timer = setInterval(() => {
    current += increment
    if (current >= end) {
      displayValue.value = end
      clearInterval(timer)
    } else {
      displayValue.value = Math.floor(current)
    }
  }, props.duration * 1000 / steps)
})
</script>
<style scoped>
.counter {
  font-size: 2.5rem;
  font-weight: 700;
  color: #c8a45d;
}
</style>