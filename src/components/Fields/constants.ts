import { FormItemType } from '@/components/ProTable/types'

// 目前发现 interface 的key 只能是三种 string number symbol   keyof any
type IPlaceholderMapping = {
  [key in FormItemType]: string
}

export const placeholderMapping: IPlaceholderMapping = {
  'el-input': '请输入',
  'z-select': '请选择',
  'el-date-picker': '请选择日期',
  'z-json': '请输入',
  'z-array': '请输入',
  useExpandField: ''
}
