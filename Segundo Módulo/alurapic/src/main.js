import Vue from 'vue'
import App from './App.vue'

//importando Resource
import VueResource from 'vue-resource';

//importando Router
import VueRouter from 'vue-router';
import {routes} from './routes';

//importando directives
import './directives/transform';

//registrando módulo/plugin no global view object
Vue.use(VueResource);

//O http sempre usará esse endereço
Vue.http.options.root = 'http://localhost:3000';

//registrando router no global view object
Vue.use(VueRouter);

const router = new VueRouter({ 
  routes,
  mode:'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})