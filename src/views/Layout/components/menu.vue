<template><el-row class="tac">
  <el-col :span="10" class="full-height">
    <el-menu active-text-color="#b01f00" background-color="#fcfaf8" class="el-menu-vertical-demo full-height"
      :collapse="isCollapse" default-active="4" text-color="#4a2020" @open="handleOpen" @close="handleClose">
      <el-tooltip class="box-item" effect="dark" :content="changeContent" placement="right" :disabled="!isCollapse">
        <el-menu-item index="-1" @click="isCollapse = !isCollapse">
          <el-icon>
            <Expand v-if="isCollapse" />
            <Fold v-else />
          </el-icon>
          <span>合起</span>
        </el-menu-item>
      </el-tooltip>
      <!-- <el-tooltip class="box-item" effect="dark" content="添加任务" placement="right" :disabled="!isCollapse"> -->
      <el-menu-item index="0" @click="$router.push('/')">
        <el-icon>
          <Plus />
        </el-icon>
        <span>添加任务</span>
      </el-menu-item>
      <!-- </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="搜索" placement="right" :disabled="!isCollapse"> -->
      <el-menu-item index="1" @click="$router.push('/')">
        <el-icon>
          <Search />
        </el-icon>
        <span>搜索</span>
      </el-menu-item>
      <!-- </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="收件箱" placement="right" :disabled="!isCollapse"> -->
      <el-menu-item index="2" @click="$router.push('/')">
        <el-icon>
          <MessageBox />
        </el-icon>
        <span>收件箱</span>
      </el-menu-item>
      <!-- </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="今天" placement="right" :disabled="!isCollapse"> -->
      <el-menu-item index="3" @click="$router.push('today')">
        <el-icon>
          <Collection />
        </el-icon>
        <span>今天</span>
      </el-menu-item>
      <!-- </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="预览" placement="right" :disabled="!isCollapse"> -->
      <el-menu-item index="4" @click="$router.push('overview')">
        <el-icon>
          <Calendar />
        </el-icon>
        <span>预览</span>
      </el-menu-item>
      <!-- </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="过滤器&标签" placement="right" :disabled="!isCollapse"> -->
      <el-menu-item index="5" @click="$router.push('/')">
        <el-icon>
          <Menu />
        </el-icon>
        <span>过滤器&标签</span>
      </el-menu-item>
      <!-- </el-tooltip> -->
    </el-menu>
  </el-col>
</el-row></template>

<script setup>
import { useRoute } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ref, computed } from 'vue';

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
}

const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}

// 初始状态为展开
const isCollapse = ref(false)
const changeContent = computed(() => {
  return isCollapse.value ? '展开' : '合起'
})

const route = useRoute()
</script>

<style scoped>
.full-height {
  height: 100vh;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
}

.tac {
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
}
</style>