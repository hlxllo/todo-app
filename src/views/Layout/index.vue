<script setup>
import Menu from './components/menu.vue';
</script>

<template>
<div class="container">
  <Menu />
  <router-view></router-view>
</div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>