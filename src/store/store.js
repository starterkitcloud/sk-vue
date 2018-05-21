import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions/actions.js'
import mutations from './mutations/mutations.js'
import getters from './getters.js'

Vue.use(Vuex);

const state = {
	contacts: [],
	detailView: false,
	searchResults: [],
	detailStaged: false,
	kitchenSink: false,
	authenticated: false,
	loading: false,
	accountDetails: false,
};

export default new Vuex.Store({
	state: state,
	actions: actions,
	mutations: mutations,
	getters: getters,
});
