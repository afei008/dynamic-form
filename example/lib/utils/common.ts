/** @format */

import { reactive } from 'vue';
import type { FormItem } from './initData';

interface StateType {
  data: FormItem[];
  setData: (value: FormItem[]) => void;
  getData: () => FormItem[];
  importData: (value: FormItem[]) => void;
  // 当前选中项
  prop: FormItem;
  setProp: (value: FormItem) => void;
}

const state = reactive<StateType>({
  data: [],
  setData(value) {
    this.data = value;
  },
  getData() {
    return this.data;
  },
  importData(value) {
    this.data = value;
    this.setProp(value[0]);
  },
  prop: {
    id: 0,
    type: '',
    prop: '',
    label: '',
    value: '',
    attrs: {
      placeholder: '',
    },
  },
  setProp(value) {
    this.prop = value;
  },
});

export default state;
