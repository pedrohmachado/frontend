import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store/index'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
