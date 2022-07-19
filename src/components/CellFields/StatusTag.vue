<template>
<el-tag
  :type="type"
  disable-transitions
  >{{ text }}
</el-tag>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

type keys = string | 0 | 1

type IStatus = {
  [key in keys] : {
    type: string
    text: string
  }
}
const props = defineProps({
  data: {
    type: String as PropType<keys>,
    required: true
  }
})

const statusMap: IStatus = {
  0: {
    type: 'danger',
    text: '禁用'
  },
  1: {
    type: 'success',
    text: '启用'
  }
}
const type = statusMap[props.data!].type
const text = statusMap[props.data!].text
</script>
