<!-- @format -->

<template>
  <el-form-item :label="props.item.label" :prop="props.item.prop">
    <el-checkbox-group v-model="value" @change="changeValue">
      <el-checkbox
        v-for="option in props.item.option!.data"
        :key="option.value"
        :value="option.value"
        :label="option.value"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>
<script setup lang="ts" name="DCheckbox">
import { ref, watch } from 'vue';
import type { FormItem } from '../utils/initData';

const props = withDefaults(
  defineProps<{
    item: FormItem;
    modelValue?: Array<string | number | boolean>;
  }>(),
  {
    item: {} as any,
    modelValue: () => [],
  }
);
const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

const changeValue = (e: string[] | number[] | boolean[]) => {
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
