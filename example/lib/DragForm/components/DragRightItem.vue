<!-- @format -->

<template>
  <div class="item">
    <div class="prefix">{{ prefix }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts" name="DragRightItem">
withDefaults(defineProps<{ prefix: string }>(), {
  prefix: '',
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.prefix {
  flex: 0 0 4em;
  padding-right: 1em;
  line-height: 32px;
}

.content {
  flex: 1;
}
</style>
