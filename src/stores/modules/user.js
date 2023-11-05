import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/API/user.js'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')

    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    // 获取用户信息
    const getInfo = async () => {
      const res = await userGetInfoService()
      // console.log(res)
      user.value = res.data.data
    }

    const setInfo = (obj) => {
      user.value = obj
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getInfo,
      setInfo
    }
  },
  {
    // 对仓库内的数据进行持久化
    persist: true
  }
)
