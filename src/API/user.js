import request from '@/utils/request.js'

// 用户注册服务
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

// 用户登录请求
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}

// 用户的基本信息
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}

// 更新用户基本资料
export const userUpdateService = ({ id, username, nickname, email, user_pic }) => {
  return request.put('/my/userinfo', {
    id,
    username,
    nickname,
    email,
    user_pic
  })
}

// 更新用户头像
export const userUpdateAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar
  })
}

// 更新用户密码
export const userUpdatePwdService = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd
  })
}
