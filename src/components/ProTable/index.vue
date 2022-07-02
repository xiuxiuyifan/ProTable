<template>
  <div class="table-box">
    <SearchForm
      :form-model="formModel"
      :change="change"
      :columns="props.columns"
      :type="props.type"
      @reset="onReset"
      @search="onSearch"
      @add="onAdd"
      @single-search="onSingleSearch"
      @refresh="onSearch"
      @custom-list-item="onCustomListItem"
    ></SearchForm>
    <el-table
      :data="tableData"
      class="table-wrapper"
      :class="{'scroll-table': hasScroll}"
      v-loading="loading"
      ref="tableRef"
      @select-all="handleSelectAll($event)"
      @selection-change="handleSelectAll($event)"
    >
      <el-table-column fixed="left" type="selection" width="50" align="center" />
      <template  v-for="(item, index) in columnsCopy" :key="index">
        <el-table-column label="操作" v-if="item.key === 'action'">
          <template #default="scope">
          <el-button
            link
            type="primary"
            @click="handleEdit(scope.row)"
            >编辑</el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button>
        </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.key"
          :label="item.title"
          :width="item.width"
        >
          <template #default="scope" v-if="item.columnType === 'status'">
            <el-tag
              :type="scope.row[item.key] === 1 ? 'success' : 'danger'"
              disable-transitions
              >{{ scope.row[item.key] === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination-wrapper" :class="{'table-footer-fixed': hasScroll}">
      <div class="batch-btn-group pull-left">
        <div class="checkbox-wrapper">
          <el-checkbox v-model="checked" :indeterminate="indeterminate" @change="toggleAllSelection"/>
        </div>
        <el-button @click="batchDelete">删除</el-button>
      </div>
      <el-pagination
        class="pull-right"
        v-model:currentPage="pageIndex"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <AddForm
      :columns="props.columns"
      :type="props.type"
      ref="addFormRef"
      :request-url="props.requestUrl"
      @ok="search('all')"
      @edit-ok="search"
    >
    </AddForm>
    <CustomListItem
      ref="customListItemRef"
      :columns="props.columns"
      @column-change="handleColumnChange"
    >
    </CustomListItem>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'

import SearchForm from '../SearchForm/index.vue'
import { FormModel } from '../SearchForm/types'
import { ColumnProps, RequestUrl } from './types'
import http from '@/service'
import { projectConfig, projectConfigBatchDelete } from '@/service/api'
import { cloneDeep } from 'lodash'
import { ElMessage, ElMessageBox } from 'element-plus'
import CustomListItem from './components/CustomListItem.vue'
import AddForm from './components/AddForm.vue'

interface Props {
  columns: ColumnProps[] // 列的字段
  type: string // 这个属于业务字段啦， 会在组件内部使用，后面处理如果不传的情况
  requestUrl: RequestUrl
  beforeSubmit?: () => void
}
const props = withDefaults(defineProps<Props>(), {
  columns: () => []
})

const columnsCopy = ref(props.columns.map(item => ({ ...item })).filter(item => item.show !== false))

const hasScroll = ref(false)

const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { height } = entry.contentRect
    const result = (height > (window.innerHeight || document.documentElement.clientHeight))
    hasScroll.value = result
  }
})

ro.observe(document.body)

// 传递给searchForm 的值
const initFormModel : any = props.columns.reduce((accumulator, currentVal) => ({
  ...accumulator,
  [currentVal.key]: ''
}), {})

// 表单搜索
const formModel = reactive<FormModel>({ ...initFormModel })
const change = (key: string, value: any) => {
  formModel[key] = value
}

// 单字段搜索
const singleParams = ref({})
const onSingleSearch = (params: any) => {
  singleParams.value = params
  search('all')
}

const onReset = () => {
  Object.keys(initFormModel).forEach(key => {
    formModel[key] = initFormModel[key]
  })
  search('all')
}

const onSearch = () => {
  search('all')
}

// 批量操作
const checked = ref(false)

// 表格数据
const tableData = ref([])
const loading = ref(false)
const total = ref<number>(0)
const tableRef = ref<any>(null)

const search = (all?: string | undefined) => {
  if (all) {
    pageIndex.value = 1
  }
  loading.value = true
  http.get({
    url: props.requestUrl.list,
    params: {
      pageIndex: pageIndex.value,
      pageSize: pageSize.value,
      type: props.type,
      ...formModel,
      ...singleParams.value
    }
  }).then(res => {
    const rows = res.data.data.rows
    const count = res.data.data.count
    total.value = count
    tableData.value = rows.map((item: any) => {
      return {
        ...item,
        ...item.value
      }
    })
    checked.value = false
  })
    .finally(() => {
      loading.value = false
    })
}

const toggleAllSelection = (selection: any) => {
  tableRef.value.toggleAllSelection()
}

const selectionData = ref([])
const indeterminate = ref<boolean>(false)

const handleSelectAll = (selection: any) => {
  selectionData.value = selection
  if (selection.length === tableData.value.length) {
    checked.value = true
    indeterminate.value = false
  } else {
    checked.value = false
    indeterminate.value = true
  }
  // 没有选中的数据
  if (selection.length === 0) {
    indeterminate.value = false
  }
}

const handleEdit = (row: any) => {
  const copyRow = cloneDeep(row)
  addFormRef?.value?.show('edit', copyRow)
}

const handleDelete = (row: any) => {
  ElMessageBox({
    title: '提示',
    type: 'warning',
    message: '确定删除吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        http.delete({
          url: `${props.requestUrl.destroy}/${row.id}`
        })
          .then(() => {
            done()
            search('all')
          })
          .finally(() => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = '确定'
          })
      } else {
        done()
      }
    }
  }).then((action) => {
    ElMessage({
      type: 'success',
      message: '操作成功！'
    })
  })
}

const batchDelete = () => {
  if (selectionData.value.length === 0) {
    ElMessage.warning('请选择要删除的数据！')
    return
  }
  ElMessageBox({
    title: '提示',
    type: 'warning',
    message: '确定删除吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        http.post({
          url: props.requestUrl.batchDelete,
          data: {
            ids: selectionData.value.map((item: any) => item.id)
          }
        })
          .then(() => {
            done()
            search('all')
            checked.value = false
          })
          .finally(() => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = '确定'
          })
      } else {
        done()
      }
    }
  }).then((action) => {
    ElMessage({
      type: 'success',
      message: '操作成功！'
    })
  })
}

onMounted(() => {
  search('all')
})

// 分页
const pageIndex = ref(1)
const pageSize = ref(20)
const handleSizeChange = (val: number) => {
  checked.value = false
  search('all')
}
const handleCurrentChange = (val: number) => {
  checked.value = false
  search()
}

// 添加表单
const addFormRef = ref<InstanceType<typeof AddForm>>()

const onAdd = () => {
  addFormRef?.value?.show('add')
}

//
const customListItemRef = ref<InstanceType<typeof CustomListItem>>()
const onCustomListItem = () => {
  customListItemRef.value?.show()
}

// 列变化
const handleColumnChange = (checkedList: string[]) => {
  columnsCopy.value = props.columns.filter(item => item.show !== false).filter(item => (checkedList.includes(item.title)))
}

</script>

<script lang="ts">
export default {
  name: 'pro-table'
}
</script>

<style lang="less" scoped>
.scroll-table{
  margin-bottom: 50px;
}
.table-wrapper{
  margin-top: 8px;
  /deep/ .el-table__header-wrapper{
    .el-table__header{
      th{
        background-color: #f5f7fa;
      }
    }
  }
}
.pagination-wrapper{
  margin-top: 15px;
  padding: 0px 15px 0px 0;
  .batch-btn-group{
    display: flex;
    align-items: center;
    .checkbox-wrapper{
      width: 50px;
      text-align: center;
    }
  }
}

.table-footer-fixed{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 99;
  padding: 15px 15px 15px 0;
  border-top: 1px solid #E1E6EB;
}
</style>
