import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta'
import './plugin/fly'
import store from './store'
import './assets/reset.css'
import clipboard from 'clipboard';

Vue.prototype.clipboard = clipboard;
Vue.config.productionTip = false
Vue.use(VueMeta)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
