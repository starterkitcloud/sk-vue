import Vue from 'vue';
import App from './components/App.vue';
import store from './store/store.js';
import router from './router'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
});
