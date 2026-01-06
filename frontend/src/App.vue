<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
// No imports needed for basic router setup
</script>

<style>
/* Global styles */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
}
</style>
 