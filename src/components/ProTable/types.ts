import { FormItemProp, FormItemProps, FormProps } from 'element-plus'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { TableProps } from 'element-plus/es/components/table/src/table/defaults'
import { PropType, ExtractPropTypes } from 'vue'

export type TypeProp = 'index' | 'selection' | 'expand'

// 区分组件库的组件和第三方组件类型
export type FormItemType =
'el-input' |
'z-select' |
'el-date-picker' |
'z-array' |
'z-json' |
'useExpandField'

export type SlotType =
'JsonField' |
'ProgressField' |
'SingleArray' |
'StatusTag' |
'TableField'

export interface selectOptions {
  label: string
  value: string | number | boolean
}

// 表格列数据的类型  开关状态
export type columnType = 'status'

// 在饿了么的column字段上面进行扩展
export type ColumnProps = {
  title: string // 列名
  key: string // 列key
  width?: number | string

  attrs?: Partial<TableColumnCtx<any>> // column的 其他属性
  formItemAttrs?: FormItemProps // formItem的原有props

  searchType?: FormItemType // 表示搜索框的类型
  search?: boolean // 是否可以搜索
  add? : boolean // 是否可以添加
  show?: boolean // 是否在列表中显示
  options?: selectOptions[]
  slotType?: SlotType // 列 slot 的类型
  slot? : string // 自定义 slot
}

export interface RequestUrl {
  list?: string
  create?: string
  update?: string
  destroy?: string
  batchDelete?: string
}

export const proTableProps = {
  columns: {
    type: Array as PropType<ColumnProps[]>, // 列的字段
    default: () => {
      return []
    }
  },
  type: {
    type: String as PropType<string> // 这个属于业务字段啦， 会在组件内部使用，后面处理如果不传的情况
  },
  requestUrl: {
    type: Object as PropType<RequestUrl>,
    default: () => {
      return {}
    }
  },
  tableAttrs: {
    type: Object as PropType<Partial<TableProps<any>>>, // 这里的 T 指的是数据项 item
    default: () => {
      return {}
    }
  },
  formAttrs: {
    type: Object as PropType<Partial<FormProps>>,
    default: () => {
      return {}
    }
  },
  beforeSubmit: {
    type: Function, // 提交之前的钩子
    default () {
      return 'Default function'
    }
  }
} as const

export type ProTableProps = Partial<ExtractPropTypes<typeof proTableProps>>
