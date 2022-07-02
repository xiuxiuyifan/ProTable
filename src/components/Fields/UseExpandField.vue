<template>
  <div class="use-expand-field">
    <el-checkbox v-model="checked" :label="label" class="checkbox-wrapper"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props{
  label: string
}

const checked = ref<boolean>(false)

const props = withDefaults(defineProps<Props>(), {
  label: ''
})
</script>

<style lang="less" scoped>
.use-expand-field{
  position: relative;
  text-align: center;
  &::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: #ccc;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .checkbox-wrapper{
    background: #fff;
    padding: 20px;
  }
}
</style>
