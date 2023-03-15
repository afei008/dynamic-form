<!-- @format -->

<template>
  <build-form v-if="data && data.length" :data="d" />
  <drag-form v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DragForm from './DragForm/index.vue';
import BuildForm from './BuildForm/index.vue';
import type { FormItem } from './utils/initData';

export default defineComponent({
  name: 'DynamicForm',
  components: {
    DragForm,
    BuildForm,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return {
      d: props.data as FormItem[],
    };
  },
});
</script>
