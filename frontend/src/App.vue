<template>
  <div class="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif;
}
.app {
  min-height: 100vh;
  background: #0a0a0a;
}
</style>