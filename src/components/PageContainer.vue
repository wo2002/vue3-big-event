<script setup>
defineProps({
  title: {
    type: String,
    // 非空
    required: true
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <!-- <el-button class="button" primary>添加分类</el-button> -->
        <slot name="extra"></slot>
      </div>
    </template>
    <!-- 插槽 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    // 垂直居中
    align-items: center;
  }
}
</style>
