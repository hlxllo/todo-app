<template>
<div class="container">
  <div class="summary">预览</div>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value" type="date" :disabled-date="disabledDate" />
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';

// 定义子组件可以触发的事件
const emit = defineEmits(['getValue']);

// 日期选择值
const value = ref(new Date());

// 禁用日期
const disabledDate = (time) => {
  return time.getTime() < Date.now();
};

watch(value, (newVal) => {
  emit('getValue', newVal);
})

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
