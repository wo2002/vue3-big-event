import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

// 将pinia中的数据统一导入到index中 ，再统一导出
// import { useUserStore } from './modules/user'
// export { useUserStore }

// 可以直接导入再导出 ，同上面效果一样
export * from './modules/user'
