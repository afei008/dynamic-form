<!-- @format -->

<template>
  <div class="drag-head">
    <el-button @click="clickView">预览</el-button>
    <el-button @click="clickJson">JSON</el-button>

    <el-dialog v-model="showView" destroy-on-close>
      <build-form ref="buildFormRef" :data="data" />
      <div>{{ formData }}</div>
      <el-button @click="clickGetData">获取表单数据</el-button>
    </el-dialog>

    <el-dialog v-model="showJson" @close="closeJson">
      <el-input
        ref="inputRef"
        v-model="json"
        type="textarea"
        autosize
        :disabled="isDisabled"
      />
      <template #footer>
        <el-button @click="clickCopy">复制</el-button>
        <el-button v-if="isDisabled" type="primary" @click="clickEdit"
          >编辑</el-button
        >
        <template v-else>
          <el-button type="primary" @click="clickUpdate">更新</el-button>
          <el-button @click="clickCancel">取消</el-button>
        </template>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="DragHead">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import BuildForm from '../../buildForm/index.vue';
import formState from '../../utils/common';
import type { FormItem } from '../../utils/initData';
import 'element-plus/theme-chalk/src/message.scss';

// 预览
const buildFormRef = ref<InstanceType<typeof BuildForm> | null>(null);
const showView = ref(false);
const data = ref<FormItem[]>([]);
const formData = ref({});
const clickView = () => {
  const json = formState.getData();
  data.value = JSON.parse(JSON.stringify(json));
  showView.value = true;
};
const clickGetData = () => {
  buildFormRef.value
    ?.getData()
    .then((res: Record<string, string>) => {
      formData.value = res;
    })
    .catch((err) => console.log(err));
};

// json
const inputRef = ref();
const showJson = ref(false);
const json = ref('');
const isDisabled = ref(true);
const clickJson = () => {
  json.value = JSON.stringify(formState.getData());
  showJson.value = true;
};
const closeJson = () => {
  isDisabled.value = true;
};
const clickCopy = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(json.value);
  } else {
    const input = inputRef.value.$el.children[0];
    input.focus();
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  }
};
const clickEdit = () => {
  isDisabled.value = false;
};
const clickCancel = () => {
  json.value = JSON.stringify(formState.getData());
  isDisabled.value = true;
};
const clickUpdate = () => {
  try {
    const d = JSON.parse(json.value);
    formState.importData(d);
  } catch {
    ElMessage.error('数据格式错误，请检查！');
  }
};
</script>

<style lang="scss" scoped>
.drag-head {
  box-sizing: border-box;
  padding: 15px;
  border-bottom: 1px solid #eee;
}
</style>
