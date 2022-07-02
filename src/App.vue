<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane
    :label="item.label"
    v-for="(item, index) in templateConfig"
    :key="index" :name="item.name"
    lazy
    >
    <!--所有的 slot内容都在表格内部处理好， columnsType进行区分-->
    <pro-table
      :columns="item.columns"
      :type="item.name"
      :request-url="requestUrl"
    >
    </pro-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ProTable from './components/ProTable/index.vue'
import { ColumnProps, RequestUrl } from './components/ProTable/types'
import { projectConfig, projectConfigBatchDelete } from './service/api'
const activeName = ref('user')

interface TemplateConfig {
  name: string
  label: string
  columns: ColumnProps[],
}

const requestUrl: RequestUrl = {
  create: projectConfig,
  list: projectConfig,
  update: projectConfig,
  destroy: projectConfig,
  batchDelete: projectConfigBatchDelete
}

const templateConfig = ref<TemplateConfig[]>([
  {
    label: 'ProTable',
    name: 'user',
    columns: [
      {
        key: 'userName',
        title: '用户名',
        searchType: 'el-input'
      },
      {
        key: 'password',
        title: '密码',
        searchType: 'el-input'
      },
      {
        key: 'email',
        title: '邮箱',
        searchType: 'el-input'
      },
      {
        key: 'phone',
        title: '手机号',
        searchType: 'el-input'
      },
      {
        key: 'role',
        title: '角色',
        searchType: 'z-select',
        attrs: {
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
        }
      },
      {
        key: 'status',
        title: '状态',
        searchType: 'z-select',
        attrs: {
          options: [
            {
              label: '启用',
              value: 1
            },
            {
              label: '禁用',
              value: 0
            }
          ]
        },
        columnType: 'status'
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
        key: 'arrayParams',
        title: '数组参数',
        searchType: 'z-array',
        search: false,
        width: 120,
        add: false,
        show: false
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
        title: 'JSON参数',
        searchType: 'z-json',
        search: false,
        width: 120,
        add: false,
        show: false
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
        width: 150
      }
    ]
  }
  // {
  //   label: '配置模板',
  //   name: 'config',
  //   columns: [
  //     {
  //       key: 'key',
  //       title: '键',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'value',
  //       title: '值',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'description',
  //       title: '描述',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'createdAt',
  //       title: '创建时间',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'updatedAt',
  //       title: '更新时间',
  //       searchType: 'el-input'
  //     }
  //   ]
  // },
  // {
  //   label: '角色模板',
  //   name: 'role',
  //   columns: [
  //     {
  //       key: 'name',
  //       title: '角色名',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'description',
  //       title: '描述',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'createdAt',
  //       title: '创建时间',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'updatedAt',
  //       title: '更新时间',
  //       searchType: 'el-input'
  //     }
  //   ]
  // },
  // {
  //   label: '任务模板',
  //   name: 'task',
  //   columns: [
  //     {
  //       key: 'name',
  //       title: '任务名',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'description',
  //       title: '描述',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'createdAt',
  //       title: '创建时间',
  //       searchType: 'el-input'
  //     },
  //     {
  //       key: 'updatedAt',
  //       title: '更新时间',
  //       searchType: 'el-input'
  //     }
  //   ]
  // }
])
</script>
<style lang="less">

</style>
