<!-- @format -->

<template>
  <div>
    <el-button> {{ value }} </el-button>
  </div>
</template>
<script setup lang="ts" name="DButton">
import { ref } from 'vue';
// import formState from '../composables/useFormData';

const value = ref('按钮');

// watch([value, props.item], (nv) => {
//   formState.changeData(name.value, nv[0]);
//   if (!props.item.build) {
//     value.value = nv[1].value;
//   }
// });
</script>
