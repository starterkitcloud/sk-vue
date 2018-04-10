import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';

let stageActions = {
	//put stage code here
	//will load the screen with the deatil of a contact given an id.
	LOAD_DETAIL_STAGE: ({commit}, id) =>{
		commit('SET_DETAIL_STAGE', id);
		commit('CLEAR_SEARCH');
	},

	//will return the screen to the initial contact list view.
	LOAD_HOME_STAGE: ({commit}) =>{
		commit('SET_DETAIL_STAGE', false);
		commit('CLEAR_SEARCH');
	},

};

module.exports = stageActions;
