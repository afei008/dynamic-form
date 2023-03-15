/** @format */

import { toRefs } from 'vue';
import formState from '../../../utils/common';
import useOptions from './options';
import useUpload from './upload';
import useDatePicker from './datePicker';

function useProp() {
  const { prop } = toRefs(formState);

  const {
    plusOptions,
    reduceOptions,
    defaultValue,
    changeDefaultValue,
    plusDefaultValue,
    reduceDefaultValue,
  } = useOptions();
  const { listTypeOptions, plusUpload, reduceUpload } = useUpload();
  const { datePickerOptions } = useDatePicker();

  return {
    prop,
    plusOptions,
    reduceOptions,
    defaultValue,
    changeDefaultValue,
    plusDefaultValue,
    reduceDefaultValue,
    listTypeOptions,
    plusUpload,
    reduceUpload,
    datePickerOptions,
  };
}

export default useProp;
