const adminRouter = [{
  id: -1,
  pid: 0,
  path: 'sys',
  name: 'sysmanager',
  meta: {
    icon: '',
    title: '系统管理',
  },
  children: [
    {
      pid: -1,
      path: '/sys/user-manager',
      name: 'user-manager',
      component: () => import('@/views/user-manager/index.vue'),
      meta: {
        icon: '',
        title: '用户管理',
      },
    },
    {
      hidden: true,
      path: '/sys/user-manager/add-user',
      name: 'user-manager-add-user',
      component: () => import('@/views/user-manager/add-user.vue'),
      meta: {
        icon: '',
        title: '新增用户',
      },
    },
    {
      pid: -1,
      path: '/sys/user-group-manager',
      name: 'user-group-manager',
      component: () => import('@/views/user-group-manager/index.vue'),
      meta: {
        icon: '',
        title: '用户组组管理',
      },
    },
  ],
}]
export default adminRouter
