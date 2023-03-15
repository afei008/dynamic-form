/** @format */

import formState from '../../../utils/common';

function useUpload() {
  const typeOptions = [
    {
      id: 1,
      label: 'text',
      value: 'text',
    },
    {
      id: 2,
      label: 'picture',
      value: 'picture',
    },
    {
      id: 3,
      label: 'picture-card',
      value: 'picture-card',
    },
  ];

  const plusUpload = () => {
    if (Array.isArray(formState.prop.value)) {
      const len = formState.prop.value.length;
      formState.prop.value.push({ id: len + 1, url: '' });
    }
  };
  const reduceUpload = (index: number) => {
    if (Array.isArray(formState.prop.value)) {
      formState.prop.value.splice(index, 1);
    }
  };

  return {
    listTypeOptions: typeOptions,
    plusUpload,
    reduceUpload,
  };
}

export default useUpload;
