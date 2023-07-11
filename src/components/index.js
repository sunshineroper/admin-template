import searchTools from './search-tools/index.vue'
import dictElTag from './dict-el-tag/index.vue'

const installComponent = (vue) => {
  vue.component('SearchTools', searchTools)
  vue.component('DictElTag', dictElTag)
}

export default installComponent
