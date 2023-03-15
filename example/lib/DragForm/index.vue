<!-- @format -->

<template>
  <div class="drag-form">
    <drag-head />
    <div class="drag-body">
      <drag-left />
      <drag-main />
      <drag-right />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DragHead from './components/DragHead.vue';
import DragLeft from './components/DragLeft.vue';
import DragMain from './components/DragMain.vue';
import DragRight from './components/DragRight.vue';

export default defineComponent({
  name: 'DragForm',
  components: {
    DragHead,
    DragLeft,
    DragMain,
    DragRight,
  },
});
</script>

<style lang="scss" scoped>
.drag-form {
  flex-flow: column;
  width: 100%;
  height: 100%;

  &,
  .drag-body {
    display: flex;
  }

  .drag-body {
    height: calc(100% - 63px);
  }

  :deep(.drag-side) {
    flex: none;
    padding: 15px;

    &:first-child {
      width: 200px;
    }

    &:last-child {
      width: 350px;
    }
  }
}
</style>
