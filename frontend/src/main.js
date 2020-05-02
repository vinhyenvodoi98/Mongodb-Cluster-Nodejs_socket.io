import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueSocketIO from 'vue-socket.io';
// import SocketIO from 'socket.io-client';

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000/events',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  })
);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
