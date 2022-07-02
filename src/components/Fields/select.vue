<template>
  <el-select
    placeholder="请选择"
    clearable
  >
    <el-option
    :label="item.label"
    :value="item.value"
    v-for="(item, index) in props.options"
    :key="index"/>
  </el-select>
</template>

<script lang="ts" setup>

interface SelectItem {
  label: string
  value: any
}
interface Props{
  options?: SelectItem[]
}

const props = withDefaults(defineProps<Props>(), {})

</script>

<script lang="ts">
export default {
  name: 'z-select'
}
</script>
