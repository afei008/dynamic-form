# 可视化动态表单

基于 `Vue3` 和 `Element Plus`，通过可视化操作生成表单，在需要用到的地方传入该数据即可生成表单

由于市面上已经有很多同类型项目了，此项目仅为个人练手，满足基本使用，更多功能将视情况增加

# 安装

由于暂未发布，因此采用本地安装

```shell
npm install ./dynamic-form
```

# 使用

在入口文件引入

```js
import DynamicForm from 'dynamic-form';
import 'dynamic-form/style.css';

createApp(App).use(DynamicForm).mount('#app');
```

在 `vue` 文件使用

设计模式，请给父元素定义一个高度

```html
<dynamic-form></dynamic-form>
```

渲染模式，传入由设计模式生成的数据即可

```html
<dynamic-form :data="data"></dynamic-form>
```

# TypeScript

暂未生成声明文件，因此 `TypeScript` 项目需要手动注释一下编辑器的提示，或者自行定义一个类型
