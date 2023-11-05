<script setup>
import { useUserStore } from '@/stores'
import { Plus, Upload } from '@element-plus/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { userUpdateAvatarService } from '@/API/user.js'
const uploadRef = ref()
const userStore = useUserStore()
// console.log(userStore.data)
// const  { data { user_pic} } = userStore.data
// const imageUrl = ref('')
const imageUrl = ref(userStore.user.user_pic)

// 本地阅览图片，将图片设置为base64位字符串
const onSelectImg = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}

//
const onSubmitImg = async () => {
  await userUpdateAvatarService(imageUrl.value)
  // console.log(res)
  ElMessage.success('图片更新成功')
  await userStore.getInfo()
}
</script>

<template>
  <page-container title="上传头像">
    <!-- 侦听图片更改 -->
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      ref="uploadRef"
      :auto-upload="false"
      :on-change="onSelectImg"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <!--手动触发上传操作，选择图片-->
    <el-button type="primary" :icon="Plus" @click="uploadRef.$el.querySelector('input').click()"
      >选择图片</el-button
    >
    <el-button type="success" :icon="Upload" @click="onSubmitImg">上传图片</el-button>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
