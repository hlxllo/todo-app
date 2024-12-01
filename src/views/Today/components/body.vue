<template>
<div class="container">
  <div class="duties">
    <Duty :date="today" :duties="duties" v-if="duties.length !== 0" />
  </div>
  <div class="desc" v-if="isWeekend(today)">
    <img src="@/assets/images/holiday.png" alt="">
    <div class="holiday">享受一个美好的假日！</div>
    <span>在您设置菜单的效率选项卡中安排休息日。</span>
  </div>
  <div class="desc" v-else>
    <img src="@/assets/images/weekday.png" alt="">
    <div class="weekday">享受一个美好的假日！</div>
    <span>在您设置菜单的效率选项卡中安排休息日。</span>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import Duty from '@/components/duty.vue';
import { getDutiesAPI } from '@/apis/duty';
import { format } from 'date-fns';


// 分页参数和数据
const page = ref(1);
const size = ref(20);
const duties = ref([]);
const today = ref(new Date())

const getDuties = async (date) => {
  const res = await getDutiesAPI(date)
  for (let i = 0; i < res.length; i++) {
    duties.value.push(res[i]);
  }
}

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

// 初始化获取任务
getDuties(format(today.value, 'yyyy-MM-dd'));


</script>

<style scoped>
.container {
  width: 100%;
}

.duties {
  margin-bottom: 20px;
}

img {
  width: 220px;
}

.desc {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.holiday {
  margin-bottom: 20px;
}

.weekday {
  margin-bottom: 20px;
}
</style>