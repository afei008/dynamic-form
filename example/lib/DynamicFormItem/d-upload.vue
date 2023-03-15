<!-- @format -->

<template>
  <el-form-item :label="props.item.label" :prop="props.item.prop">
    <el-upload
      v-model:file-list="value"
      :action="props.item.upload?.url"
      :list-type="props.item.upload?.type"
      :on-success="changeValue"
    >
      <el-button type="primary">上传</el-button>
    </el-upload>
  </el-form-item>
</template>

<script setup lang="ts" name="DUpload">
import { ref, watch } from 'vue';
import type { FormItem } from '../utils/initData';

const props = withDefaults(
  defineProps<{ item: FormItem; modelValue?: Array<string> }>(),
  {
    item: {} as any,
    modelValue: () => [],
  }
);
const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

const changeValue = (e: any) => {
  if (props.item.upload?.key) {
    const data = e[props.item.upload.key];
    let result = [];
    if (Array.isArray(data)) {
      result = data.map((d) => {
        let obj = { url: '' };
        if (typeof d === 'string') {
          obj = { url: d };
        } else {
          obj = { ...d };
          obj.url = d.urlKey;
        }
        return obj;
      });
      emit('update:modelValue', result);
    }
  }
};

watch(
  () => props.modelValue,
  (nv) => {
    value.value = nv;
  },
  {
    deep: true,
  }
);
</script>
