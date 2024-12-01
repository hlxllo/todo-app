<template>
<div class="container">
  <div class="summary">预览</div>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value" type="date" :disabled-date="disabledDate" />
    </div>
  </div>

  <Body :value="value" />
</div>
</template>

<script setup>
import { ref } from 'vue';
import Body from './body.vue';

// 日期选择值
const value = ref(new Date());

// 禁用日期
const disabledDate = (time) => {
  return time.getTime() < Date.now();
};

</script>

<style scoped>
.container {
  width: 100%;
}

.summary {
  font-size: 28px;
  margin-bottom: 20px;
  padding-top: 60px;
}
</style>
