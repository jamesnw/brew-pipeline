// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import RouterView from './components/RouterView';
Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.config.productionTip = false;

const router = new VueRouter({ routes });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<RouterView/>',
  components: { RouterView },
  router
});
