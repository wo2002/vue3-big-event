<script setup>
import { ref } from 'vue'
import { artAddChannelList, artUpdateChannelList } from '@/API/article.js'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)

const formModel = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}

// 向外面提供一个open方法
// 用来区分添加弹层和编辑弹层
const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row } //将row里面的对象进行解构，赋值给formModel
}

const emit = defineEmits(['success'])
const formRef = ref()
//提交弹层
const handleSubmit = async () => {
  // 表单预验证
  await formRef.value.validate()

  //
  const isEdit = formModel.value.id
  if (isEdit) {
    await artUpdateChannelList(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelList(formModel.value)
    ElMessage.success('提交成功')
  }
  emit('success')
  dialogVisible.value = false
}
// 向外面暴露方法
defineExpose({
  open
})
</script>

<template>
  <!-- 编辑弹层 -->
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="30%">
    <el-form
      :model="formModel"
      label-width="100px"
      style="padding-right: 30px"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
