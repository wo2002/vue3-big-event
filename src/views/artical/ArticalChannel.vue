<script setup>
import { ref } from 'vue'
import { artGetChannelList, artDelChannelList } from '../../API/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import EditChannel from '@/views/artical/components/EditChannel.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const channelList = ref([])
const loading = ref(false)
const dialog = ref()
// 获取文章分类列表
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelList()
  channelList.value = res.data.data
  // channelList.value = []
  // console.log(channelList.value)
  loading.value = false
}
getChannelList()

// 编辑文章分类
const handleEdit = (row) => {
  // row表示当前行的数据
  // index表示下标
  // console.log(index, row)
  dialog.value.open(row)
}

//删除分类
const handleDel = async (row) => {
  // console.log(index, row)

  await ElMessageBox.confirm('你确定要删除吗', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDelChannelList(row.id)
  // console.log(res)
  ElMessage.success('删除成功')
  getChannelList()
}

// 添加分类
const handleAdd = () => {
  dialog.value.open()
}

// 重新渲染页面
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button class="button" primary @click="handleAdd">添加分类</el-button>
    </template>
    <!-- 文章分类内容 -->
    <el-table :data="channelList" width="100%" v-loading="loading">
      <el-table-column label="序号" width="150" type="index"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="handleEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="handleDel(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- 当数据为空时显示内容 -->
      <template #empty>
        <el-empty description="当前数据为空" />
      </template>
    </el-table>
    <!-- 获取组件 -->
    <EditChannel ref="dialog" @success="onSuccess"></EditChannel>
  </PageContainer>
</template>

<style lang="scss"></style>
