<template>
<div class="container">
  <div class="summary">{{ fmd }}</div>
  <hr>
  <div v-for="duty in duties" :key="duty.id">{{ duty.name }}</div>
  <hr>

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
  summary: {
    type: Date,
    default: new Date()
  },
  duties: {
    type: Array,
    default: [
      { 'id': 1, 'name': '扫地' },
      { 'id': 2, 'name': '洗车' },
    ]
  }
})

const fmd = format(props.summary, 'MM月dd日');
</script>

<style scoped>
.container {
  width: 800px;
  margin: 20px;
}
</style>