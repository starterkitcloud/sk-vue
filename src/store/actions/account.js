import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';

let accountActions = {

 LOAD_ACCOUNT_DETAILS : async ({commit})=>{
  const contentApi = new ContentApi();
  //get the user info.
  try{
   let resp = await axios.get(contentApi.userSummary, contentApi.config);
   commit('SET_ACCOUNT_DETAILS', resp.data)
  }
  catch(e){
   console.log(e)
  }

 },
 CREATE_USER_ACCOUNT : async ({commit}, data)=>{
  const contentApi = new ContentApi();
  //get the user info.
  try{
   let resp = await axios.post(contentApi.users, data);
   return resp;
  }
  catch(e){
   return e;
  }
 },

 CONFIRM_USER_ACCOUNT : async ({commit}, data)=>{
    const contentApi = new ContentApi();
    //get the user info.
    try{
     let resp = await axios.get(contentApi.confirmAccount+'?email='+data.email+'&token='+data.token);
     return resp;
    }
    catch(e){
     return e;
    }
  },
  REQUEST_RESET_PASSWORD : async ({commit}, data)=>{
   const contentApi = new ContentApi();
   //get the user info.
   try{
    let resp = await axios.get(contentApi.requestResetPassword+'?email='+data.email);
    return resp;
   }
   catch(e){
    return e;
   }
  }


}



module.exports = accountActions;
