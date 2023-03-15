<!-- @format -->

<template>
  <el-form-item :label="props.item.label" :prop="props.item.prop">
    <el-input v-model="value" @input="changeValue" />
  </el-form-item>
</template>
<script setup lang="ts" name="DInput">
import { ref, watch } from 'vue';
import type { FormItem } from '../utils/initData';

const props = withDefaults(
  defineProps<{ item: FormItem; modelValue?: string }>(),
  {
    item: {} as any,
    modelValue: '',
  }
);
const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

const changeValue = (e: string) => {
  emit('update:modelValue', e);
};

watch(
  () => props.modelValue,
  (nv) => {
    value.value = nv;
  }
);
</script>
