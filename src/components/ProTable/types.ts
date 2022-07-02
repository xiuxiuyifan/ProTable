
export type TypeProp = 'index' | 'selection' | 'expand'

// 区分组件库的组件和第三方组件类型
export type FormItemType =
'el-input' |
'z-select' |
'el-date-picker' |
'z-array' |
'z-json' |
'useExpandField'

// 表格列数据的类型  开关状态
export type columnType = 'status'

// 在饿了么的column字段上面进行扩展
export type ColumnProps = {
  title: string // 列名
  key: string // 列key
  searchType?: FormItemType // 表示搜索框的类型
  search?: boolean // 是否可以搜索
  attrs?: any // 其他属性
  width?: number | string
  add? : boolean // 是否可以添加
  columnType?: columnType
  show?: boolean // 是否在列表中显示
}

export interface RequestUrl {
  list?: string
  create?: string
  update?: string
  destroy?: string
  batchDelete?: string
}
