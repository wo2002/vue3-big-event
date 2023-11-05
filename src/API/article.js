import request from '@/utils/request.js'

// 获取文章分类
export const artGetChannelList = () => {
  return request.get('/my/cate/list')
}

// 添加文章分类
export const artAddChannelList = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })
}

// 更新文章分类
export const artUpdateChannelList = ({ id, cate_name, cate_alias }) => {
  return request.put('/my/cate/info', {
    id,
    cate_name,
    cate_alias
  })
}

// 删除文章
export const artDelChannelList = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}

// 获取文章列表
export const artGetListService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

// 发布文章
export const artUpdateListService = (data) => {
  return request.post('/my/article/add', data)
}

// export const artUpdateListService = ({ title, cate_id, content, cover_img, state }) => {
//   return request.post('/my/article/add', {
//     title,
//     cate_id,
//     content,
//     cover_img,
//     state
//   })
// }

// 获取文章详情
export const artGetDetailService = (id) => {
  return request.get('/my/article/info', {
    params: {
      id
    }
  })
}

// 更新文章
export const artUpdateService = (data) => {
  return request.put('/my/article/info', data)
}

// 删除文章
export const artDelService = (id) => {
  return request.delete('/my/article/info', {
    params: {
      id
    }
  })
}
