<!-- @format -->

<template>
  <el-form-item :label="props.item.label" :prop="props.item.prop">
    <el-date-picker
      v-model="value"
      :type="props.item.datePicker?.type"
      :placeholder="props.item.datePicker?.placeholder"
      :start-placeholder="props.item.datePicker?.startPlaceholder"
      :end-placeholder="props.item.datePicker?.endPlaceholder"
      value-format="YYYY-MM-DD HH:mm:ss"
      @change="changeValue"
    />
  </el-form-item>
</template>
<script setup lang="ts" name="DCheckbox">
import { ref, watch } from 'vue';
import type { FormItem } from '../utils/initData';

const props = withDefaults(
  defineProps<{
    item: FormItem;
    modelValue?: Array<string | number | boolean> | string;
  }>(),
  {
    item: {} as any,
    modelValue: () => [],
  }
);
const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

const changeValue = (e: string[] | string) => {
  emit('update:modelValue', e);
};

watch(
  () => props.modelValue,
  (nv) => {
    value.value = nv;
  },
  { deep: true }
);
</script>
