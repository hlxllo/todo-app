<template>
<div class="container">
  <div class="duties" v-infinite-scroll="load">
    <Duty v-for="duty in duties" :key="duty.id" :date="duty.date" :duties="duty.duties" :id="'duty-' + duty.id" />
  </div>
</div>
</template>

<script setup>
import { ref, watch, nextTick, toRefs } from 'vue';
import Duty from '@/components/duty.vue';
import { getDutiesAPI } from '@/apis/duty';
import { format } from 'date-fns';

// 获取日历选择的日期
const props = defineProps({
  value: {
    type: Date,
    default: new Date()
  }
})

const { value } = toRefs(props);

// 分页参数和数据
const page = ref(1);
const size = ref(20);
const duties = ref([]);
// const loading = ref(false);
const date = new Date();
let milliseconds = Date.now() - d;
const d = 1000 * 60 * 60 * 24;
let id = 0;

// 获取任务数据
const getDuties = async (date, page, size) => {
  // loading.value = true;
  const res = await getDutiesAPI(date, page, size);
  const arr = new Array(size);
  for (let i = 0; i < arr.length; i++) {
    milliseconds += d;
    const duty = { id: id++, date: new Date(milliseconds), duties: [] };
    arr[i] = duty;
    for (let j = 0; j < res.length; j++) {
      const resD = new Date(res[j].date);
      const gap = parseInt((resD.getTime() - milliseconds) / d);
      if (gap === 0) {
        arr[i].duties.push({ id: res[j].id, name: res[j].name });
      }
    }
  }
  duties.value = [...duties.value, ...arr];
  // console.log(duties.value);

};

// 初始化获取任务
getDuties(format(date, 'yyyy-MM-dd'), page.value, size.value);

// 无限滚动
async function load() {
  // if (loading.value) return;
  page.value++;
  getDuties(format(date, 'yyyy-MM-dd'), page.value, size.value);
}

// 滚动到选中日期
const scrollToDate = async (selectedDate) => {
  const target = duties.value.find((duty) => format(duty.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'));
  if (target) {
    await nextTick(); // 确保 DOM 渲染完成
    const element = document.querySelector(`#duty-${target.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

// 监听日期选择变化
watch(value, (newVal) => {
  console.log('value changed:', newVal);
  scrollToDate(newVal);
});
</script>

<style scoped>
.container {
  width: 100%;
}

.duties {
  margin-bottom: 20px;
}
</style>