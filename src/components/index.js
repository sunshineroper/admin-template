import searchTools from './search-tools/index.vue'
import dictElTag from './dict-el-tag/index.vue'
import dictElSelect from './dict-el-select/index.vue'

const installComponent = (vue) => {
  vue.component('SearchTools', searchTools)
  vue.component('DictElTag', dictElTag)
  vue.component('DictElSelect', dictElSelect)
}

export default installComponent
