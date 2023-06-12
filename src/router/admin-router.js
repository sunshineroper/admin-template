const adminRouter = [
  {
    path: '/sys/menu-manager',
    name: 'menu-manager',
    component: () => import('@/views/menu-manager/index.vue'),
    meta: {
      icon: '',
      title: '菜单管理',
    },
  },
]
export default adminRouter
