<template>
<div class="container">
  <div class="summary">
    {{ fmd }} {{ isToday(props.date) ? '今天' : '' }} {{ isTomorrow(props.date) ? '明天' : '' }} {{ weekDay }}
  </div>
  <hr>
  <div v-for="duty in duties" :key="duty.id" class="duties">
    <el-button @click="del(duty.id)" plain color="black" type="success" :icon="showIconMap[duty.id] ? Check : ''" circle
      size="small" @mouseenter="showIconMap[duty.id] = true" @mouseleave="showIconMap[duty.id] = false" />
    <span class="dname">{{ duty.name }}</span>
  </div>
  <hr v-if="duties.length !== 0">

  <div class="add" @click="showAddDialog = true">
    <el-icon>
      <Plus />
    </el-icon>
    <span class="add">添加任务</span>
  </div>

  <!-- 弹窗 -->
  <el-dialog title="添加任务" v-model="showAddDialog" width="30%">
    <el-input v-model="newDutyName" placeholder="请输入任务名称"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showAddDialog = false">取消</el-button>
      <el-button type="primary" @click="add">确定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script setup>
import { format, isToday, isTomorrow } from 'date-fns';
import { computed, reactive, ref } from 'vue';
import { Check, Plus } from '@element-plus/icons-vue';
import { delDutyByIdAPI, addDutyAPI } from '@/apis/duty';

const props = defineProps({
  date: {
    type: Date,
    default: new Date()
  },
  duties: {
    type: Array,
    default: []
  }
});

// 管理每个按钮的 showIcon 状态
const showIconMap = reactive({});

// 初始化 showIconMap
props.duties.forEach(duty => {
  showIconMap[duty.id] = false;
});

const fmd = format(props.date, 'MM月dd日');
const weekDay = computed(() => {
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekDays[props.date.getDay()];
});

// 根据 id 删除 duty
const delDutyById = async (id) => {
  await delDutyByIdAPI(id);
};

// 根据名称添加 duty
const addDuty = async (name, date) => {
  const res = await addDutyAPI(name, date);
  props.duties.push(res)
};

// 移除前端的数组元素并删除后端的数据
const del = async (id) => {
  for (let i = 0; i < props.duties.length; i++) {
    if (props.duties[i].id === id) {
      props.duties.splice(i, 1);
      break;
    }
  }
  await delDutyById(id);
};

// 弹窗和新增任务的逻辑
const showAddDialog = ref(false);
const newDutyName = ref('');

const add = () => {
  if (newDutyName.value.trim()) {
    // 添加 duty
    addDuty(newDutyName.value, format(props.date, 'yyyy-MM-dd'));
    // 再次初始化 showIconMap
    props.duties.forEach(duty => {
      showIconMap[duty.id] = false;
    });
    newDutyName.value = '';
    showAddDialog.value = false;
  }
};
</script>

<style scoped>
.container {
  width: 800px;
  margin-top: 35px;
}

.duties {
  line-height: 30px;
}

.add {
  margin-left: 10px;
  cursor: pointer;
}

.dname {
  margin-left: 15px;
}
</style>
