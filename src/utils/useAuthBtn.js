import { useRoute } from 'vue-router'
import { reactive } from 'vue'

const useAuthBtn = () => {
  const route = useRoute()
  const { name } = route
  const obj = {}
  route.meta.role_btn_list.forEach((item) => {
    obj[item.identity] = {
      id: item.id,
      router_name: name,
    }
  })
  return reactive(obj) || reactive(obj)
}

export default useAuthBtn
