<template>
<el-dialog
  v-model="visible"
  :title="title"
  width="50%"
  @close="close"
>
  <el-form
    class="list-search-container"
    label-width="100px"
    label-position="left"
    :inline="true"
    :model="addFormData"
  >
    <el-row :gutter="15">
      <template
        v-for="(item, index) in addFields"
        :key="index"
      >
        <el-col :span="24" v-if="item.searchType === 'useExpandField'">
          <UseExpandField :label="item.title"/>
        </el-col>
        <el-col :span="12" v-else>
          <el-form-item :label="item.title + '：'" style="width: 100%">
            <Component
              :is="item.searchType"
              v-model="addFormData[item.key]"
              :placeholder="item.searchType && placeholderMapping[item.searchType]"
              style="width: 100%;"
              v-bind="item.attrs"
            >
            </Component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
    </span>
  </template>
</el-dialog>
</template>

<script lang="ts" setup>
import { ColumnProps, RequestUrl } from '@/components/ProTable/types'
import http from '@/service'
import { projectConfig } from '@/service/api'
import { ElMessage } from 'element-plus'
import { pick } from 'lodash'
import { reactive, ref, computed } from 'vue'
import { placeholderMapping } from '@/components/Fields/constants'
import UseExpandField from '@/components/Fields/UseExpandField.vue'

interface Props {
  columns: ColumnProps[],
  type: string,
  requestUrl: RequestUrl
}
type ActionType = 'add' | 'edit' | ''

type StringKey = Record<string, any>

type TitleMap = {
  [key in ActionType]: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['ok', 'editOk'])

const visible = ref(false)

const addFields = reactive(props.columns.filter(item => item.add !== false))

const initFormData = () => addFields.reduce((acc, curr) => ({ ...acc, [curr.key]: '' }), {})

const addFormData = ref<StringKey>(initFormData())
const actionType = ref<ActionType>('')

const title = computed(() => {
  const titleMap:TitleMap = {
    '': '',
    add: '新增',
    edit: '编辑'
  }
  return titleMap[actionType.value] || '新增'
})

// 原始的 row 数据, 不需要响应式
let rawRow: any = {}

const close = () => {
  for (const key in addFormData) {
    addFormData.value[key] = ''
  }
  rawRow = {}
  loading.value = false
  visible.value = false
}

const loading = ref(false)

const handleSubmit = () => {
  loading.value = true
  if (actionType.value === 'add') {
    http.post({
      url: props.requestUrl.create,
      data: {
        type: props.type,
        value: addFormData.value
      }
    })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: '添加成功'
        })
        visible.value = false
        emit('ok')
      })
      .finally(() => {
        loading.value = false
      })
  } else if (actionType.value === 'edit') {
    http.put({
      url: `${props.requestUrl.update}/${rawRow.id}`,
      data: {
        type: props.type,
        value: addFormData.value
      }
    })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: '编辑成功'
        })
        visible.value = false
        emit('editOk')
      })
      .finally(() => {
        loading.value = false
      })
  }
}

const show = (type: ActionType, params?: any) => {
  actionType.value = type
  if (type === 'add') {
    addFormData.value = initFormData()
  } else if (type === 'edit') {
    rawRow = params
    // 根据添加的 key 进行赋值
    addFormData.value = pick(params, Object.keys(initFormData()))
  }
  visible.value = true
}

defineExpose({
  show
})
</script>
