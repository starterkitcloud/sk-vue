import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions/actions.js'
import mutations from './mutations/mutations.js'
import getters from './getters.js'
import ContactSearch from '../utils.js';

Vue.use(Vuex);

const state = {
	contacts: [],
	detailView: false,
	searchResults: [],
	detailStaged: false,
	kitchenSink: false,
	authenticated: false,
	loading: true,
	account_details: false,
};

export default new Vuex.Store({
	state: state,
	actions: actions,
	mutations: mutations,
	getters: getters,
});
