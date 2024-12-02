<template>
<div class="container">
  <div class="summary" v-if="showSummary">
    {{ fmd }} {{ isToday(props.date) ? '今天' : '' }} {{ isTomorrow(props.date) ? '明天' : '' }} {{ weekDay }}
  </div>
  <hr v-if="showHr">
  <div v-for="duty in duties" :key="duty.id" class="duties">
    <el-tooltip class="box-item" effect="dark" content="完成" placement="left">
      <el-button @click="del(duty.id)" plain color="black" type="success" :icon="showIconMap[duty.id] ? Check : ''"
        circle size="small" @mouseenter="showIconMap[duty.id] = true" @mouseleave="showIconMap[duty.id] = false" />
    </el-tooltip>

    <span class="dname" @click="updateDutyByName(duty.id, duty.name)">{{ duty.name }}</span>
    <br>
    <span v-if="showDate" class="date"> {{ fmd }}</span>
  </div>
  <hr v-if="duties.length !== 0">


  <div class="add" @click="showAddDialog = true" v-if="showAdd">
    <el-icon>
      <Plus />
    </el-icon>
    <span class="add-duty">添加任务</span>
  </div>

  <!-- 添加任务弹窗 -->
  <el-dialog title="添加任务" v-model="showAddDialog" width="30%" center>
    <el-date-picker v-if="showCalendar" v-model="value" type="date" :disabled-date="disabledDate" />
    <el-input v-model="newDutyName" placeholder="请输入任务名称"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="add">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改任务弹窗 -->
  <el-dialog title="修改任务" v-model="showUpdateDialog" width="30%" center>
    <el-input v-model="updateDutyName"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showUpdateDialog = false">取消</el-button>
        <el-button type="primary" @click="update">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

</div>
</template>

<script setup>
import { format, isToday, isTomorrow } from 'date-fns';
import { computed, reactive, ref } from 'vue';
import { Check, Plus } from '@element-plus/icons-vue';
import { delDutyByIdAPI, addDutyAPI, updateDutyAPI } from '@/apis/duty';

const props = defineProps({
  date: {
    type: Date,
    default: new Date()
  },
  duties: {
    type: Array,
    default: []
  },
  showSummary: {
    type: Boolean,
    default: true
  },
  showHr: {
    type: Boolean,
    default: true
  },
  showAdd: {
    type: Boolean,
    default: true
  },
  showDate: {
    type: Boolean,
    default: false
  },
  showCalendar: {
    type: Boolean,
    default: false
  },
});

// 管理每个按钮的 showIcon 状态
const showIconMap = reactive({});

const value = ref(new Date())

// 禁用日期
const disabledDate = (time) => {
  return time.getTime() < Date.now();
};

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

// 修改 duty
const updateDuty = async (id, name) => {
  await updateDutyAPI(id, name);
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

// 弹窗和新增修改任务的逻辑
const showAddDialog = ref(false);
const showUpdateDialog = ref(false);
const newDutyName = ref('');
const updateDutyName = ref('');
const updateDutyId = ref(-1);

const add = () => {
  if (newDutyName.value.trim()) {
    // 添加 duty
    if (props.showCalendar) {
      addDuty(newDutyName.value, format(value.value, 'yyyy-MM-dd'));
    } else {
      addDuty(newDutyName.value, format(props.date, 'yyyy-MM-dd'));
    }
    // 再次初始化 showIconMap
    props.duties.forEach(duty => {
      showIconMap[duty.id] = false;
    });
    newDutyName.value = '';
    showAddDialog.value = false;
  }
};

const update = () => {
  if (updateDutyName.value.trim()) {

    const result = props.duties.find(duty => duty.id === updateDutyId.value)

    result.name = updateDutyName.value;
    // 修改 duty
    updateDuty(updateDutyId.value, updateDutyName.value);
    updateDutyName.value = '';
    updateDutyId.value = -1;
    showUpdateDialog.value = false;
  }
};

// 修改 duty 的逻辑
const updateDutyByName = (id, name) => {
  showUpdateDialog.value = true;
  updateDutyName.value = name;
  updateDutyId.value = id;
}
</script>

<style scoped>
.container {
  width: 800px;
  margin-top: 35px;
}

.duties {
  line-height: 30px;
}

.add-duty {
  margin-left: 15px;
}

.add {
  cursor: pointer;
}

.add:hover {
  color: rgb(227, 76, 62);
}

.dname {
  margin-left: 15px;
}

.date {
  font-size: 14px;
  margin-left: 30px
}
</style>
