<template>
  <div class="search-form">
    <div class="pull-left">
      <el-button type="primary" style="margin-right: 12px;" @click="handleAdd">新增</el-button>
    </div>
    <div class="search-wrapper" v-show="!fold">
      <div class="simple-search">
        <el-select
          placeholder="识别搜索"
          clearable
          v-model="parameter"
          class="search-key"
          value-key="key"
          @change="handleChangeParameter"
        >
          <el-option
          :label="item.title"
          :value="item"
          v-for="(item, index) in searchFields"
          :key="index"/>
        </el-select>
        <Component
          v-if="parameter"
          :is="parameter.searchType"
          class="input-with-select"
          style="width: 100%;"
          v-model="parameterValue"
          :placeholder="parameter.searchType && placeholderMapping[parameter.searchType]"
          clearable
        >
        </Component>
        <el-input placeholder="请选择字段后，进行搜索" v-else class="input-with-select"/>
        <el-button class="search-btn" icon="Search"  @click="handleSingleFieldSearch"/>
      </div>
    </div>
    <div class="list-search-bar pull-left">
      <div class="list-search-wrapper" v-show="fold">
        <el-form
          class="list-search-container"
          label-width="100px"
          label-position="left"
          :inline="true"
        >
          <el-row :gutter="15">
            <el-col
            :span="8"
            v-for="(item, index) in searchFields"
            :key="index"
            >
              <el-form-item :label="item.title + '：'" style="width: 100%">
                <!-- 如果动态组件需要特殊处理的组件，都需要抽离成自定义的filed组件，以便于扩展和管理 -->
                <Component
                  :is="item.searchType"
                  :model-value="formModel[item.key]"
                  style="width: 100%;"
                  @update:model-value="($event) => handleChange(item.key, $event)"
                  v-bind="item.attrs"
                  :options="item.options"
                  :placeholder="item.searchType && placeholderMapping[item.searchType]"
                >
                </Component>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="margin-bottom: 8px;">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">清空</el-button>
        </div>
      </div>
      <div class="list-tool-bar">
        <el-link type="primary" class="link-btn" @click="handleAdvancedSearch" v-if="fold">普通搜索</el-link>
        <el-link type="primary" class="link-btn" @click="handleAdvancedSearch" v-else>高级搜索</el-link>
        <el-button icon="Refresh" class="link-btn" @click="handleRefresh"/>
        <el-button icon="Download" @click="handleDownload" />
        <el-button icon="Setting" @click="handleSetting"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { ColumnProps } from '../ProTable/types'
import { FormModel } from './types'
import { placeholderMapping } from '@/components/Fields/constants'

interface Props {
  formModel: Partial<FormModel>,
  columns: ColumnProps[],
  change: (key: string, value: any) => void
  type: string
}

const props = withDefaults(defineProps<Props>(), {})

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'reset'): void
  (e: 'search'): void
  (e: 'ok'): void
  (e: 'add'): void
  (e: 'singleSearch', params: any): void
  (e: 'refresh'): void
  (e: 'download'): void
  (e: 'customListItem'): void
}>()

onMounted(() => {
  console.log()
})

const handleChange = (key: string, value: any) => {
  props.change(key, value)
}

// 高级搜索
const fold = ref(false)
const handleAdvancedSearch = () => {
  fold.value = !fold.value
}

const parameterValue = ref('')
const parameter = ref<ColumnProps>()

// 过滤掉不需要搜索的字段
const searchFields = computed<ColumnProps[]>(() => {
  return props.columns.filter(item => item.search !== false)
})

const handleChangeParameter = (field: any) => {
  parameterValue.value = ''
}

// 重置
const handleReset = () => {
  emit('reset')
}

const handleSearch = () => {
  emit('search')
}

const handleAdd = () => {
  emit('add')
}

const handleSingleFieldSearch = () => {
  parameter?.value?.key &&
  emit('singleSearch', {
    [parameter.value.key]: parameterValue.value
  })
}

const handleRefresh = () => {
  emit('refresh')
}

const handleDownload = () => {
  emit('download')
}

const handleSetting = () => {
  emit('customListItem')
}
</script>

<script lang="ts">
export default {
  name: 'search-form'
}
</script>

<style lang="less" scoped>
.search-form {
  position: relative;
  .search-wrapper{
    display: inline-block;
    vertical-align: top;
    width: 448px;
    .simple-search{
      display: flex;
      .search-key{
        /deep/ .el-input__wrapper{
          border-radius: var(--el-input-border-radius) 0 0 var(--el-input-border-radius);
        }
      }
      .input-with-select{
        /deep/ .el-input__wrapper{
          border-radius:  0;
        }
      }
      .search-btn{
        border-radius: 0 var(--el-input-border-radius) var(--el-input-border-radius) 0;
      }
    }
  }
  .list-search-bar{
    padding-top: 20px;
    .list-tool-bar{
      position: absolute;
      top: 0;
      right: 0;
      .link-btn{
        margin-left: 12px;
      }
    }
  }
}
</style>
