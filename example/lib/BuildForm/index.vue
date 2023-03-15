<!-- @format -->

<template>
  <el-config-provider :locale="zhCn">
    <el-form
      ref="formRef"
      :model="form.model"
      :rules="form.rules"
      label-width="100px"
    >
      <component
        :is="DynamicFormItem[`d-${item.type}`]"
        v-for="item in form.items"
        :key="item.prop"
        v-model="form.model[item.prop]"
        :item="item"
      />
    </el-form>
  </el-config-provider>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { ref, reactive } from 'vue';
// @ts-ignore ...
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import DynamicFormItem from '../DynamicFormItem';
import type { FormItem } from '../utils/initData';

const props = withDefaults(defineProps<{ data: FormItem[] }>(), {
  data: () => [],
});

interface FormType {
  model: Record<string, FormItem['value']>;
  rules: Record<string, FormItem['rule']>;
  items: any;
}

const formRef = ref<FormInstance>();
const form = reactive<FormType>({
  model: {},
  rules: {},
  items: props.data,
});

props.data.forEach((item: FormItem, index: number) => {
  form.model[item.prop] = item.value;
  if (item.rule) {
    form.rules[item.prop] = item.rule;
  }

  if (item?.option?.useUrl && item.option.url) {
    fetch(item.option.url)
      .then((response) => response.json())
      .then((res) => {
        if (item?.option?.key) {
          const data = res[item.option.key];
          const labelKey = item.option.labelKey as string;
          const valueKey = item.option.valueKey as string;
          form.items[index].option.data = data.map((d: any) => {
            const obj = {
              label: d[labelKey],
              value: d[valueKey],
            };
            return obj;
          });
        }
      });
  }
});

const getData = () => {
  return new Promise((resolve, reject) => {
    formRef?.value?.validate((valid, fields) => {
      if (valid) {
        resolve(form.model);
      } else {
        reject(new Error('error submit!', fields));
      }
    });
  });
};

defineExpose({
  getData,
});
</script>
<script lang="ts">
export default {
  name: 'BuildForm',
};
</script>
