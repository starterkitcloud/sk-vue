import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';


let contactsActions = {

 LOAD_CONTACTS_LIST: async ({commit}) =>{
  try{
    const contentApi = new ContentApi();
    let resp = await axios.get(contentApi.contacts, contentApi.config);
    commit('SET_CONTACTS_LIST', { contacts: resp.data });
    return resp;
  }
  catch(e){
   console.log(e)
  }
	},

 CREATE_CONTACT: async ({commit}, data) =>{
  try{
    const contentApi = new ContentApi();
    let response = await axios.post(contentApi.contacts, data, contentApi.config)
    return response;
  }
  catch(e){
   console.log(e);
   return e;
  }
 },

 DELETE_CONTACT: async ({commit}, theId) =>{
  try{
    const contentApi = new ContentApi();
    let resp = await axios.delete(contentApi.contacts+theId+'/', contentApi.config)
    return resp;
  }
  catch(e){
   console.log(e);
   return e;
  }
 },

 UPDATE_CONTACT: async ({commit}, data) =>{
  try{
   const contentApi = new ContentApi();
   let theData = {
    'first_name':data.detail.first_name,
    'last_name':data.detail.last_name,
    'birthday':data.detail.birthday
   }
   let theId = data.detail.id
   let resp = await axios.put(contentApi.contacts+theId+'/', theData, contentApi.config)
   return resp;
  }
  catch(e){
   return e;
  }
 }

}

module.exports = contactsActions;
