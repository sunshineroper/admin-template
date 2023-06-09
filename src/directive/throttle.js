export default {
  mounted(el, binding) {
    const timer = binding.value || 500
    el.time = null
    el.addEventListener('click', () => {
      el.disabled = true
      if (el.time !== null) {
        el.disabled = true
        el.time = null
        clearTimeout(el.time)
      }

      el.time = setTimeout(() => {
        el.disabled = false
      }, timer)
    })
  },
}
