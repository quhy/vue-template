import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'normalize.css';
import './core/route-actived';
import axios from './core/axios';
import basePlugin from './plugins/base-plugin';
import websocket from "./plugins/websocket";
import G2 from '@antv/g2';
import moment from 'moment';
import pluginExport from '@d2-projects/vue-table-export';

Vue.config.productionTip = false;
// 启用elementUI
Vue.use(ElementUI);
Vue.use(G2);
Vue.use(basePlugin);
Vue.use(websocket);
Vue.use(pluginExport);

Vue.prototype.axios = axios;
Vue.prototype.moment = moment;
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
});

// 接口请求地址配置
if (process.env.NODE_ENV === 'production') {
  Vue.prototype.baseURL = 'http://test/1.0'; // 正式
  Vue.prototype.uploadURL = 'http://test/upload/';
  Vue.prototype.mapURL = 'https://restapi.amap.com';// 正式
  Vue.prototype.shareURL = location.origin +'/web/';
} else {
  Vue.prototype.mapURL = 'https://restapi.amap.com';// 正式
  Vue.prototype.shareURL =  location.origin +'/web/';// 正式
  Vue.prototype.baseURL = 'http://test/api/1.0'; // 正式
  Vue.prototype.uploadURL = 'http://test/upload/';
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
