const modules = import.meta.glob('@/directive/*.js', {
  eager: true,
})
const moduleVal = new Map()
Object.keys(modules).forEach((key) => {
  if (key && modules[key]) {
    const newKey = key.replace(/^\.\/|\.ts|\.js/g, '')
    moduleVal.set(newKey, modules[key].default)
  }
})
export default (app) => {
  moduleVal.forEach((value, key) => {
    app.directive('throttle', value)
  })
}
