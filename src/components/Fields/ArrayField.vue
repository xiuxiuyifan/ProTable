<template>
  <div v-for="(item, index) in arrForm" :key="index">
    <el-form-item></el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface ArrayFieldItem{
  kind: string // 数组项的组件类型？

}

// 根据传入的配置， 生成一份与之匹配的 数据用来存贮表单的值
const arrForm = ref([
  {
    name: {
      default: '',
      value: '',
      type: 'el-input',
      title: '姓名'
    },
    age: {
      default: 0,
      value: 0,
      type: 'el-input-number',
      title: '年龄'
    },
    sex: {
      default: '',
      value: '',
      type: 'z-el-select',
      title: '性别'
    },
    birthday: {
      default: '',
      value: '',
      type: 'el-date-picker',
      title: '生日'
    }
  }
])

interface Props{
  arrayItem: ArrayFieldItem[]
}

const props = withDefaults(defineProps<Props>(), {
})
</script>
