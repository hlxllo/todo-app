<template>
<div class="container" :class="{ show: y > 150 }">
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
import { useScroll } from '@vueuse/core';

const { y } = useScroll(window);

// 定义子组件可以触发的事件
const emit = defineEmits(['getValue']);

const value = ref(new Date());

// 禁用日期
const disabledDate = (time) => {
  return time.getTime() < Date.now();
};

// 监听日期选择变化
watch(value, (newVal) => {
  emit('getValue', newVal);
});

</script>

<style scoped>
.container {
  width: 100%;
  height: 65px;
  position: fixed;
  left: 300px;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-200%);
  opacity: 1;
  margin: 0;
  font-size: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.show {
  transition: all 0.3s linear;
  transform: none;
  opacity: 1;
}

.summary {
  margin-bottom: 5px;
}
</style>