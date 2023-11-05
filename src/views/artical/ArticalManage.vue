<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import SelectChannel from '@/views/artical/components/SelectChannel.vue'
import { artGetListService, artDelService } from '@/API/article.js'
import { formatTime } from '@/utils/format.js'
import EditArticle from '@/views/artical/components/EditArticle.vue'
const articleList = ref([])
const total = ref(0)
const loading = ref(false)

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 获取文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

getArticleList()

// 增加文章
const EditArticleRef = ref()
const onAddArticle = () => {
  EditArticleRef.value.open({})
}

// 编辑文章
const handleEdit = async (row) => {
  EditArticleRef.value.open(row)
}

// 删除文章
const handleDel = async (row) => {
  await artDelService(row.id)
  ElMessage.success('删除成功')
  await getArticleList()
}
// 处理每页条数变化
const onSizeChange = async (size) => {
  // console.log(size)
  // params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}

// 改变当前页面
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 搜索按钮
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

// 重置按钮
const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getArticleList()
}

// 添加文章成功，跳转到相应页面
const onSuccess = (type) => {
  // 添加文章，进行跳转最后一页，重新渲染页面
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
    getArticleList()
  } else {
    // 编辑操作，直接渲染页面
    getArticleList()
  }
}

// 重置按钮
</script>
<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button class="button" primary @click="onAddArticle">发布文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <SelectChannel v-model="params.cate_id"> </SelectChannel>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select placeholder="请选择" v-model="params.state">
          <el-option value="已发布"></el-option>
          <el-option value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 内容 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column label="文章标题" prop="title" type="primary"></el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button circle :icon="Edit" type="primary" plain @click="handleEdit(row)"></el-button>
          <el-button circle :icon="Delete" type="danger" plain @click="handleDel(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页内容 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉 -->
    <EditArticle ref="EditArticleRef" @success="onSuccess"></EditArticle>
  </PageContainer>
</template>

<style lang="scss"></style>
