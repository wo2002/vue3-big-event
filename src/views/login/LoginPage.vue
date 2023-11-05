<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/API/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(true)

const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const form = ref()

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 4, max: 15, message: '字符长度为4-8位', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\w{6,15}$/, message: '密码为6-15位数字，字母或下划线', trigger: 'change' }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\w{6,15}$/, message: '密码为6-15位数字，字母或下划线', trigger: 'change' },
    {
      // 自定义检验
      // rule: 当前校验规则相关信息
      // value: 所校验的表单元素目前的表单值
      // callback: 无论成功还是失败， 都需要callback回调
      // 校验失败：callback(new Error('两次密码不一致'))，校验成功：callback()
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次密码不一致'))
        }
        callback()
      },
      trigger: 'change'
    }
  ]
})

// 注册之前进行预校验
const register = async () => {
  await form.value.validate()
  // console.log(form.value)
  // console.log('注册成功')
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value = false
  // console.log(res)
}

// 侦听isregister变化，清空表单数值
watch(isRegister, () => {
  formModel.value.username = ''
  formModel.value.password = ''
  formModel.value.repassword = ''
})

const userStore = useUserStore()
const router = useRouter()
//登录
const login = async () => {
  await form.value.validate()

  const res = await userLoginService(formModel.value)
  // console.log(res)
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}
</script>

<template>
  <!-- el-row表示一行，并将一行分为24份 -->
  <!-- :span=12 代表在一行中， 占12份 -->
  <!-- ：span=6, 表示在一行中， 占6份 -->
  <!-- ：offset="3" 代表一行中， 左侧margin份数 -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册 -->
      <!-- ref="form" 获取form表单组件 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="formModel"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model.trim="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录 -->
      <el-form ref="form" size="large" autocomplete="off" v-else :model="formModel" :rules="rules">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input :prefix-icon="View" placeholder="测试"> </el-input>
        </el-form-item> -->
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
