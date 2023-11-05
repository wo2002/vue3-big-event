<script setup>
import { ref } from 'vue'
import SelectChannel from '@/views/artical/components/SelectChannel.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artUpdateListService, artGetDetailService, artUpdateService } from '@/API/article.js'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 抽屉显示
const drawerVisible = ref(false)

// 发布文章，数据
const defaultForm = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}

const formModel = ref({ ...defaultForm })
// 对编辑文章还是添加文章进行判断
const open = async (row) => {
  drawerVisible.value = true
  //   console.log(row)
  if (row.id) {
    // console.log('编辑文章')
    const res = await artGetDetailService(row.id)
    // console.log(res)
    formModel.value = res.data.data
    imageUrl.value = baseURL + formModel.value.cover_img
    // console.log(formModel.value.cover_img)
    // 将网络图片地址转换成file对象
    const file = await imageUrlToFile(imageUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = file
  } else {
    // console.log('增加文章')
    formModel.value = { ...defaultForm }
  }
}
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

// 图片选择相关逻辑
const imageUrl = ref('')

// 上传图片
const onSelectImg = (UploadFile) => {
  // console.log(UploadFile)
  imageUrl.value = URL.createObjectURL(UploadFile.raw)
  formModel.value.cover_img = UploadFile.raw
}

// 文章发布
const QuillEditorRef = ref()
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  // 将发布状态存入formModel
  formModel.value.state = state
  // console.log(formModel.value)

  // 将数据转换成formdata类型
  const fd = new FormData()
  for (let key in formModel.value) {
    // console.log(key)
    // console.log(formModel.value[key])
    fd.append(key, formModel.value[key])
  }

  // await artUpdateListService()
  // console.log(fd)
  if (formModel.value.id) {
    // console.log('编辑')
    await artUpdateService(fd)
    ElMessage.success('修改成功')
    drawerVisible.value = false
    emit('success', 'edit')
  } else {
    const res = await artUpdateListService(fd)
    console.log(res)
    ElMessage.success('发布成功')

    // 清除发布文章的内容
    imageUrl.value = ''

    // 清除富文本框里的内容
    QuillEditorRef.value.setHTML('')

    drawerVisible.value = false
    // 通知父组件，添加成功
    emit('success', 'add')
  }
}

// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <!-- 抽屉 -->
  <!-- rtl从右向左 -->
  <el-drawer
    v-model="drawerVisible"
    :title="formModel.id ? '编辑文章' : '发布文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <SelectChannel v-model="formModel.cate_id" width="100%"></SelectChannel>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 此处需要关闭 element-plus 的自动上传，不需要配置 action 等参数
              只需要做前端的本地预览图片即可， 无需在提交前上传图标
              语法：URL.createObjectURL() 创建本地预览的地址， 来预览             
        -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectImg"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <!-- 进行绑定文本框的内容,将格式改为html -->
          <QuillEditor
            ref="QuillEditorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
// 图片选择的样式
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

// 富文本编辑器

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
