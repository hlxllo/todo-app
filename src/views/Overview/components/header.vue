<template>
<div class="container">
  <div class="summary">预览</div>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value" type="date" :disabled-date="disabledDate" />
    </div>
  </div>
  <div class="duties" v-infinite-scroll="load">
    <Duty v-for="duty in duties" :key="duty.id" :date="duty.date" :duties="duty.duties" />
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import Duty from './duty.vue';
import { getDutiesAPI } from '@/apis/duty';
import { format } from 'date-fns';

// 根据日期查询任务
// 分页参数默认值
const page = ref(1)
const size = ref(20)
const duties = ref([])
const date = new Date()
let milliseconds = Date.now() - d
const d = 1000 * 60 * 60 * 24
let id = 0

const getDuties = async (date, page, size) => {
  const res = await getDutiesAPI(date, page, size)
  console.log(res);
  // 创建一个等长数组
  const arr = new Array(size)
  for (let i = 0; i < arr.length; i++) {
    milliseconds += d
    const duty = { 'id': id++, 'date': new Date(milliseconds), 'duties': [] }
    arr[i] = duty
    // 遍历响应结果
    for (let j = 0; j < res.length; j++) {
      const resD = new Date(res[j].date);
      console.log(res[j]);
      const gap = parseInt((resD.getTime() - milliseconds) / d)
      // 如果天数匹配
      if (gap === 0) {
        arr[i].duties.push({ 'id': res[j].id, 'name': res[j].name })
      }
    }
  }
  duties.value = [...duties.value, ...arr]
  console.log(duties.value);
}

// 初始调用一次
getDuties(format(date, 'yyyy-MM-dd'), page.value, size.value)

const value = ref(new Date())

const disabledDate = (time) => {
  return time.getTime() < Date.now()
}

// 无限滚动
async function load() {
  page.value++
  getDuties(format(date, 'yyyy-MM-dd'), page.value, size.value)
}

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
