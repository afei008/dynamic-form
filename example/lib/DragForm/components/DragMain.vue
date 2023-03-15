<!-- @format -->

<template>
  <div class="drag-main">
    <div class="chart">
      <draggable
        v-model="data"
        :group="{ name: 'form', pull: 'clone' }"
        item-key="id"
        :style="{ height: '100%' }"
        @start="drag = true"
        @end="dragEnd"
        @add="dragAdd"
        @choose="dragChoose"
      >
        <template #item="{ element }">
          <component
            :is="DynamicForm[`d-${element.type}`]"
            v-model="element.value"
            :item="element"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts" name="DragMain">
import { ref, toRefs } from 'vue';
import draggable from 'vuedraggable';
import DynamicForm from '../../DynamicFormItem';
import formState from '../../utils/common';

const { data } = toRefs(formState);
const drag = ref(false);

const dragEnd = () => {
  drag.value = false;
  formState.setData(data.value);
};
const dragAdd = () => {
  const len = data.value.length;
  formState.setData(data.value);
  formState.setProp(data.value[len - 1]);
};
const dragChoose = ({ oldIndex }: { oldIndex: number }) => {
  formState.setProp(data.value[oldIndex]);
};
</script>

<style lang="scss" scoped>
.drag-main {
  position: relative;
  box-sizing: border-box;
  flex: 1;
  padding: 15px;
  border: {
    right: 1px solid #eee;
    left: 1px solid #eee;
  }

  background: #f8f8f8;

  .chart {
    height: 100%;
    background: #fff;
  }

  :deep(.el-form-item) {
    position: relative;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      cursor: pointer;
      content: '';
      background: transparent;
    }
  }
}
</style>
