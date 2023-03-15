/** @format */

interface OptionType {
  url?: string;
  useUrl?: boolean;
  key?: string;
  labelKey?: string;
  valueKey?: string;
  data: Array<Record<string, number | string>> | null;
}

interface UploadType {
  url: string;
  type: string;
  count: number;
  key: string;
  urlKey: string;
}

interface DatePickerType {
  type: string;
  placeholder: string;
  startPlaceholder: string;
  endPlaceholder: string;
}

// id：拖动项唯一值
// type：表单项类型
// prop：提交的字段名
// label：表单项标题
// value：默认值
// url：获取选项的接口地址
// options：select、checkbox、radio 的 option 对象
// attrs：组件的属性
// rank：排序
// rule：校验规则
// upload：上传组件的配置对象

export interface FormItem {
  id?: number;
  type: string;
  prop: string;
  label?: string;
  value?:
    | string
    | number
    | boolean
    | Array<Record<string, string | number> | string | number | boolean>;
  option?: OptionType;
  attrs?: Record<string, number | string | boolean>;
  rank?: number;
  rule?: Array<Record<string, string | boolean>>;
  upload?: UploadType;
  datePicker?: DatePickerType;
  build?: boolean;
}

const data: FormItem[] = [
  { id: 1, type: 'input', prop: 'input', label: '文本框', value: '' },
  {
    id: 2,
    type: 'select',
    prop: 'select',
    label: '下拉框',
    value: '',
    option: {
      data: [
        { id: 1, label: '选项1', value: 1 },
        { id: 2, label: '选项2', value: 2 },
      ],
    },
  },
  {
    id: 3,
    type: 'radio',
    prop: 'radio',
    label: '单选框',
    value: '',
    option: {
      data: [
        { id: 1, label: '选项1', value: 1 },
        { id: 2, label: '选项2', value: 2 },
      ],
    },
  },
  {
    id: 4,
    type: 'checkbox',
    prop: 'checkbox',
    label: '多选框',
    value: [],
    option: {
      data: [
        { id: 1, label: '选项1', value: 1 },
        { id: 2, label: '选项2', value: 2 },
      ],
    },
  },
  {
    id: 5,
    type: 'upload',
    prop: 'upload',
    label: '上传',
    value: [],
    upload: {
      url: '',
      type: 'text',
      count: 1,
      key: '',
      urlKey: '',
    },
  },
  {
    id: 6,
    type: 'datePicker',
    prop: 'datePicker',
    label: '时间',
    value: [],
    datePicker: {
      type: 'date',
      placeholder: '请选择时间',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
    },
  },
];

export default data;
