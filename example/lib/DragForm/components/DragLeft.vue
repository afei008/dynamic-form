<!-- @format -->

<template>
  <div class="drag-side">
    <draggable
      v-model="initData"
      :group="{ name: 'form', pull: 'clone', put: false }"
      item-key="id"
      :sort="false"
      :force-fallback="true"
      class="draggable"
      :clone="dragClone"
      @start="dragStart"
      @end="dragEnd"
      @choose="dragChoose"
    >
      <template #item="{ element }">
        <span class="btn">
          <el-button>{{ element.label }}</el-button>
        </span>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts" name="DragLeft">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import initData from '../../utils/initData';

const drag = ref(false);
const chooseIndex = ref(0);

const dragChoose = ({ oldIndex }: { oldIndex: number }) => {
  chooseIndex.value = oldIndex;
};

// 克隆时创建新的数据
const dragClone = ({ id }: { id: number }) => {
  const chooseData = initData[chooseIndex.value];
  const clone = JSON.parse(JSON.stringify({ ...chooseData, id: id + 1 }));
  return clone;
};

const dragEnd = () => {
  drag.value = false;
};

const dragStart = () => {
  drag.value = true;
};
</script>

<style lang="scss" scoped>
.draggable {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;

  .btn {
    width: calc(50% - 5px);
    margin-bottom: 10px;

    & > button {
      width: 100%;
    }
  }
}
</style>
