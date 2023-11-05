<script setup>
import { artGetChannelList } from '@/API/article.js'
import { ref } from 'vue'
const channelList = ref([])
const getChannel = async () => {
  const res = await artGetChannelList()
  channelList.value = res.data.data
}
getChannel()

defineProps({
  modelValue: {
    type: [Number, String]
  },
  //对选择框宽度进行设置
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <!-- 与父组件进行绑定 -->
  <!-- 动态设置宽 -->
  <el-select
    placeholder="请选择"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :value="item.id"
      :label="item.cate_name"
    ></el-option>
  </el-select>
</template>
