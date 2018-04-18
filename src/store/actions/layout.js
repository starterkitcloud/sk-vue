import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';

let layoutActions = {
 SET_LOADER : async ({commit}, value)=>{
  commit('SET_LOADER', value)
 }
}

module.exports = layoutActions;
