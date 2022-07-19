<template>
<el-button
  type="primary"
  class="show-json"
  v-if="jsonData"
  link
  @click="dialogVisible = true"
  >{{ jsonStr }}</el-button
>
<el-dialog
  v-model="dialogVisible"
  title="详情"
  append-to-body
  width="30%"
>
  <json-viewer
    :value="jsonData"
    :expand-depth=5
    copyable
    boxed
    sort></json-viewer>
</el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import JsonViewer from 'vue-json-viewer'

const props = defineProps({
  data: {
    type: String
  }
})

const jsonStr = ref(props.data)
const jsonData = jsonStr.value ? JSON.parse(jsonStr.value) : ''
const dialogVisible = ref(false)
</script>

<style lang="less" scoped>
.show-json{
  width: 100%;
  /deep/ span{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
