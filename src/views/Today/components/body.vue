<template>
<div class="container">
  <div class="duties">
    <Duty :date="today" :duties="duties" :show-summary="false" :show-hr="false" />
  </div>
  <div v-if="duties.length === 0">
    <div class="desc" v-if="isWeekend(today)">
      <img src="@/assets/images/holiday.png" alt="">
      <div class="holiday">享受一个美好的假日！</div>
      <span>在您设置菜单的效率选项卡中安排休息日。</span>
    </div>
    <div class="desc" v-else>
      <img src="@/assets/images/weekday.png" alt="">
      <div class="weekday">您今天需要完成什么？</div>
      <span>通常情况下，在此添加的任务将会在今天截止。</span>
    </div>
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
const showSummary = ref(false)
const showHr = ref(false)

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