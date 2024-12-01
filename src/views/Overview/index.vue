<template>
<div class="container">
  <Fix @get-value="getValue" />
  <Header @get-value="getValue" />

  <Body :value="value" />
</div>
</template>

<script setup>
import Header from './components/header.vue';
import Fix from './components/fix.vue';
import Body from './components/body.vue';
import { ref, watch } from 'vue';

const value = ref(new Date());

const getValue = (date) => {
  value.value = date
}

watch(value, (newVal) => {
  console.log(newVal)
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;
}
</style>