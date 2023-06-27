export const commonRules = {
  name: { required: true, trigger: 'blur', message: '菜单名称不能为空' },
  router_url: { required: true, trigger: 'blur', message: '路由地址' },
  title: { required: true, trigger: 'blur', message: '菜单标题不能为空' },
  component_path: { required: true, trigger: 'blur', message: '组件路径不能为空' },
  // router_name: { required: true, trigger: 'blur', validator: validateRouterName },
  hidden: { required: true, trigger: 'change', message: '菜单显示状态不能为空' },
  status: { required: true, trigger: 'change', message: '菜单状态不能为空' },
}

const menuFolderRules = JSON.parse(JSON.stringify(commonRules))

delete menuFolderRules.title

delete menuFolderRules.component_path

delete menuFolderRules.router_url

export { menuFolderRules }
