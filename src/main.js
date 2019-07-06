import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global_ from './Global'
import store from './store'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_,
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


