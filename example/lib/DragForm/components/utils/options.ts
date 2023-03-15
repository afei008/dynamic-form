/** @format */

import { ref, watch } from 'vue';
import formState from '../../../utils/common';

function useOptions() {
  let options = formState.prop.option?.data;

  const plusOptions = () => {
    if (options) {
      const len = options.length;
      const id = options[len - 1].id as number;
      options.push({
        id: id + 1,
        label: `选项${id + 1}`,
        value: id + 1,
      });
      if (formState.prop.option) {
        formState.prop.option.data = options;
      }
    }
  };
  const reduceOptions = (index: number) => {
    if (options) {
      options.splice(index, 1);
    }
  };

  const defaultValue = ref([] as Array<{ id: number; value: string }>);
  const changeDefaultValue = () => {
    formState.prop.value = defaultValue.value.map((item) => item.value);
  };

  const plusDefaultValue = () => {
    const id = defaultValue.value.length + 1;
    defaultValue.value.push({ id, value: '' });
  };
  const reduceDefaultValue = (index: number) => {
    defaultValue.value.splice(index, 1);
  };

  watch(
    () => formState.prop,
    (nv) => {
      if (nv.option?.data) {
        options = nv.option.data;
      }
    }
  );

  return {
    plusOptions,
    reduceOptions,
    defaultValue,
    changeDefaultValue,
    plusDefaultValue,
    reduceDefaultValue,
  };
}

export default useOptions;
