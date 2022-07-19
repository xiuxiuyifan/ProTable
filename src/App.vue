<template>
  <el-card shadow="never">
    <pro-table
      type="user"
      :columns="columns"
      :request-url="requestUrl"
      :form-attrs="formAttrs"
      >
      <template v-slot:userName>
        {{'666'}}
      </template>
    </pro-table>
  </el-card>
</template>

<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { ref, reactive } from 'vue'
import ProTable from './components/ProTable/index.vue'
import { ColumnProps, RequestUrl } from './components/ProTable/types'
import { projectConfig, projectConfigBatchDelete } from './service/api'
import { FormProps } from 'element-plus/lib/components/form/src/form'

const requestUrl: RequestUrl = {
  create: projectConfig,
  list: projectConfig,
  update: projectConfig,
  destroy: projectConfig,
  batchDelete: projectConfigBatchDelete
}
const columns: ColumnProps[] = [
  {
    key: 'selection',
    title: 'selection',
    attrs: {
      fixed: 'left',
      align: 'center',
      type: 'selection'
    },
    add: false,
    search: false
  },
  {
    key: 'userName',
    title: '用户名',
    searchType: 'el-input',
    width: 120,
    attrs: {
      sortable: true,
      resizable: true
    },
    slot: 'userName'
  },
  {
    key: 'role',
    title: '角色',
    searchType: 'z-select',
    width: 120,
    options: [
      {
        label: '管理员',
        value: 'admin'
      },
      {
        label: '普通用户',
        value: 'user'
      }
    ]
  },
  {
    key: 'arrayParams',
    title: '数组参数',
    searchType: 'z-array',
    search: false,
    width: 120,
    add: false,
    show: true
  },
  {
    key: 'password',
    title: 'ProgressField',
    width: 120,
    searchType: 'el-input',
    slotType: 'ProgressField'
  },
  {
    key: 'email',
    title: 'SingleArray',
    width: 140,
    searchType: 'el-input',
    slotType: 'SingleArray'
  },
  {
    key: 'phone',
    title: 'TableField',
    width: 140,
    searchType: 'el-input',
    slotType: 'TableField'
  },
  {
    key: 'status',
    title: 'StatusTag',
    searchType: 'z-select',
    width: 100,
    options: [
      {
        label: '启用',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ],
    slotType: 'StatusTag'
  },
  {
    key: 'hasUseArray',
    title: '是否使用数组参数?',
    search: false,
    searchType: 'useExpandField',
    show: false,
    add: false
  },
  {
    key: 'hasUseArray',
    title: '是否使用JSON参数?',
    search: false,
    searchType: 'useExpandField',
    show: false,
    add: false
  },
  {
    key: 'jsonParams',
    title: 'JsonField',
    searchType: 'z-json',
    search: false,
    width: 120,
    add: true,
    show: true,
    slotType: 'JsonField'
  },
  {
    key: 'createdAt',
    title: '创建时间',
    width: 180,
    searchType: 'el-date-picker',
    add: false
  },
  {
    key: 'updatedAt',
    title: '更新时间',
    width: 180,
    searchType: 'el-date-picker',
    add: false
  },
  {
    key: 'action',
    title: '操作',
    search: false,
    add: false,
    width: 150,
    attrs: {
      fixed: 'right'
    }
  }
]

const formAttrs = reactive<Partial<FormProps>>({
  labelPosition: 'right',
  rules: reactive<FormRules>({
    userName: [
      { required: true, message: '此字段不能为空！' }
    ]
  })
})
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
