<template>
  <el-dialog
    v-model="visible"
    title="自定义列表项"
    width="700px"
    @close="close"
  >
  <el-checkbox-group v-model="checkList" class="checkbox-group">
    <el-checkbox
      :label="column.title"
      v-for="(column, index) in columns.filter(item => item.key !== 'action').filter(item => item.show !== false)"
      :key="index"
      class="checkbox-item"
    />
  </el-checkbox-group>
  <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { ColumnProps } from '@/components/ProTable/types'
interface Props {
  columns: ColumnProps[],
}

const props = withDefaults(defineProps<Props>(), {})

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'columnChange', checkedList: string[]): void
}>()

const visible = ref(false)

const checkList = ref(props.columns.filter(item => item.show !== false).map(item => (item.title)))

const close = () => {
  console.log()
}

const show = () => {
  visible.value = true
}

const handleSubmit = () => {
  emit('columnChange', checkList.value)
  visible.value = false
}

defineExpose({
  show
})
</script>

<style lang="less" scoped>
.checkbox-group{
  display: flex;
  flex-wrap: wrap;
  .checkbox-item{
    width: 25%;
    margin-right: 0;
  }
}
</style>
