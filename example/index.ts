/** @format */

import DynamicForm from './lib/index.vue';

export default {
  install: (app: any) => {
    // 全局挂载组件
    app.component(DynamicForm.name, DynamicForm);
  },
};
