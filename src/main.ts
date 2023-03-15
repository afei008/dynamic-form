/** @format */

import { createApp } from 'vue';
import App from './App.vue';
import './app.css';

import DynamicForm from '../example/index';

createApp(App).use(DynamicForm).mount('#app');
