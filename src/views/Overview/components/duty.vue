<template>
<div class="container">
  <div class="summary">{{ fmd }}</div>
  <hr>
  <div v-for="duty in duties" :key="duty.id">{{ duty.name }}</div>
  <hr v-if="duties.length !== 0">

  <div class="add">
    <el-icon>
      <Plus />
    </el-icon>
    <span>添加任务</span>
  </div>
</div>
</template>

<script setup>
import { format } from 'date-fns';
const props = defineProps({
  date: {
    type: Date,
    default: new Date()
  },
  duties: {
    type: Array,
    default: []
  }
})

const fmd = format(props.date, 'MM月dd日');
</script>

<style scoped>
.container {
  width: 800px;
  margin: 20px;
}
</style>