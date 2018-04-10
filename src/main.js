import Vue from 'vue';
import App from './components/App.vue';
import store from './store/store.js';

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
});
