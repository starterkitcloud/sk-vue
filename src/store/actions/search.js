import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';


let searchActions = {
 //will show search results in place of the full contact list given a search term.
 LOAD_SEARCH_RESULTS: ({commit}, searchTerm) => {
  commit('SET_SEARCH_RESULTS', searchTerm );
 },

}

module.exports = searchActions;
