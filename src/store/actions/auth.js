import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';
const contentApi = new ContentApi();
import qs from 'qs'

let authActions = {
 //authenticates the user
 AUTHENTICATE: async ({commit}, data) =>{
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
   try{
    let resp = await axios.get(contentApi.root, contentApi.config);
    commit('TOGGLE_AUTH_STATE', localStorage.getItem('authToken'));
    return true
   }
   catch(e){
    console.log(e);
    commit('TOGGLE_AUTH_STATE', false);
    return e;
   }
	},

}

module.exports = authActions;
