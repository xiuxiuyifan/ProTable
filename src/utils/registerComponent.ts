
// 全局注册自定义field组件
import ZSelect from '../components/Fields/select.vue'
import UseExpandField from '../components/Fields/UseExpandField.vue'

export default {
  install (app: any) {
    app.component('z-select', ZSelect)
    app.component('use-expand-field', UseExpandField)
  }
}
