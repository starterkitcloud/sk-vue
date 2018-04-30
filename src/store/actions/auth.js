import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';
import qs from 'qs'

let authActions = {
 //authenticates the user
 AUTHENTICATE: async ({commit}, data) =>{
  const contentApi = new ContentApi();
		let theData = {
			username:data.username,
			password:data.password,
   client_id: contentApi.clientID,
			grant_type: 'password'
		}
  try{
   let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
   }
   let resp = await axios.post( contentApi.authToken , qs.stringify(theData), headers)
			commit('TOGGLE_AUTH_STATE', resp.data.access_token)
   return resp;
  }
  catch(e){
   console.log(e)
   return e;
  }
	},
 //makes sure the token is not expired
	'CHECK_TOKEN_IS_VALID': async ({commit}) =>{
  const contentApi = new ContentApi();
   try{
    let resp = await axios.get(contentApi.root, contentApi.config);
    commit('TOGGLE_AUTH_STATE', localStorage.getItem('authToken'));
    return true
   }
   catch(e){
    console.log(e);
    commit('TOGGLE_AUTH_STATE', false);
    return false;
   }
	},
 //makes sure the token is not expired
	'LOG_USER_OUT': async ({commit}) =>{
   commit('TOGGLE_AUTH_STATE', false)
	},

 'ASSUME_AUTH':({commit}) =>{
  commit('TOGGLE_AUTH_STATE', localStorage.getItem('authToken'));
 }

}

module.exports = authActions;
