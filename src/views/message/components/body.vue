<template>
<div class="container">
  <div class="duties">
    <Duty v-for="duty in duties" :key="duty.id" :date="duty.date" :duties="duty.duties" :show-summary="false"
      :show-hr="false" :show-date="true" :show-add="false" />
    <Duty :show-summary="false" :show-hr="false" :show-calendar="true" />
  </div>
  <div v-if="duties.length === 0">
    <div class="desc">
      <img src="@/assets/images/messages.png" alt="">
      <div class="holiday">您的心安无价</div>
      <span>干得漂亮！您所有的任务都在正确的地方集中管理。</span>
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

const getDuties = async (date) => {
  const res = await getDutiesAPI(date)
  for (let i = 0; i < res.length; i++) {
    // 如果对象存在则增加任务
    const duty = duties.value.find(duty => format(duty.date, 'yyyy-MM-dd') === format(res[i].date, 'yyyy-MM-dd'))
    if (duty) {
      duty.duties.push(res[i])
    } else {
      // 不存在则创建对象
      duties.value.push({ 'id': res[i].id, 'date': new Date(res[i].date), 'duties': [res[i]] });
    }
  }
  console.log(duties.value);

}

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