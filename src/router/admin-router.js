const adminRouter = [{
  path: 'sys',
  name: 'sysmanager',
  meta: {
    icon: '',
    title: '系统管理',
  },
  children: [
    {
      path: '/sys/user-manager',
      name: 'user-manager',
      component: () => import('@/views/user-manager/index.vue'),
      meta: {
        icon: '',
        title: '用户管理',
      },
    },
    {
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
