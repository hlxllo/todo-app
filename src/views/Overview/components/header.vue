<template>
<div class="container">
  <div class="summary">预览</div>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker v-model="value" type="date" :disabled-date="disabledDate" />
    </div>
  </div>
  <div class="duties">
    <Duty :summary="value" />
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
const getDuties = async (date, page, size) => {
  const res = await getDutiesAPI(date, page, size)
  console.log(res);
}

// 初始调用一次
getDuties(format(new Date(), 'yyyy-MM-dd'), page.value, size.value)

const value = ref(new Date())

const disabledDate = (time) => {
  return time.getTime() < Date.now()
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

/* .demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
} */

/* .demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
} */
</style>
