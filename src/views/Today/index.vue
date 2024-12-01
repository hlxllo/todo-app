<template>
<div class="container">
  <Header />

  <Body />
</div>
</template>

<script setup>
import Header from './components/header.vue';
import Body from './components/body.vue';
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;
}
</style>