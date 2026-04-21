<template>
  <span class="counter">{{ displayValue }}</span>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  target: Number,
  duration: { type: Number, default: 2 }
})

const displayValue = ref(0)

onMounted(() => {
  gsap.to({ val: 0 }, {
    val: props.target,
    duration: props.duration,
    onUpdate: function() {
      displayValue.value = Math.floor(this.targets()[0].val)
    },
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.counter {
  font-size: 2.5rem;
  font-weight: 700;
  color: #c8a45d;
}
</style>