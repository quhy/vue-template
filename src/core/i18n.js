import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zhCN from '../assets/lang/zh-CN';

Vue.use(VueI18n);

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'zh-CN',   // 设置地区
    fallbackLocale: 'zh-CN',    //语言缺失返回
    messages: {
        'zh-CN': zhCN
    },  // 设置地区信息
});

export default i18n;
