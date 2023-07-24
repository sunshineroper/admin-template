import { computed } from 'vue'
import { userStore } from '@/store/modules/user'

export default {
  install: (app) => {
    const store = userStore()
    app.directive('auth', {
      mounted: (el, binding) => {
        let type = ''
        let routerName = ''
        const roleRouter = computed(() => store.roleRouter)
        const user = computed(() => store.userInfo)
        const isAdmin = user.value.role_list.some(role => role.level === 0)
        if (isAdmin)
          return
        switch (Object.prototype.toString.call(binding.value)) {
          case '[object Array]': {
            const isUndefined = binding.value.every(item => typeof item === 'undefined')
            type = 'Array'
            if (isUndefined)
              type = ''
            else
              routerName = binding.value[0].router_name
          }
            break
          // eslint-disable-next-line no-lone-blocks
          case '[object Object]': {
            routerName = binding.value.router_name
            binding.value = [binding.value]
            type = 'object'
          }
            break
          default:
            type = ''
            break
        }
        if (type === '') {
          el.parentNode.removeChild(el)
          return
        }

        const menu = roleRouter.value.find(item => item.router_name === routerName)
        if (!menu) {
          el.parentNode.removeChild(el)
          return
        }

        const allAuthBtnId = menu.role_btn_list.map(item => item.id)
        const flag = binding.value.some(item => allAuthBtnId.includes(item.id))
        if (!flag)
          el.parentNode.removeChild(el)
      },
    })
  },
}
