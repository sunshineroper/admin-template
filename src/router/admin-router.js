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
      component: () => import('@/views/sys-manager/user-manager/index.vue'),
      meta: {
        icon: '',
        title: '用户管理',
      },
    },
  ],
}]
export default adminRouter
