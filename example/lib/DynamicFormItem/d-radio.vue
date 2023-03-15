<!-- @format -->

<template>
  <el-form-item :label="props.item.label" :prop="props.item.prop">
    <el-radio-group v-model="value" @change="changeValue">
      <el-radio
        v-for="option in props.item.option!.data"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </el-radio-group>
  </el-form-item>
</template>
<script setup lang="ts" name="DRadio">
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

const changeValue = (e: string | number | boolean) => {
  emit('update:modelValue', e);
};

watch(
  () => props.modelValue,
  (nv) => {
    value.value = nv;
  }
);
</script>
