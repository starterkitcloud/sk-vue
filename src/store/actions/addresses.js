import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';

let addressesActions = {
 CREATE_ADDRESS: async ({commit}, data) =>{
   try{
    const contentApi = new ContentApi();
    let theData = {
     'address_line1':data.address_line1,
     'address_line2':data.address_line2,
     'postal_code':data.postal_code,
     'city':data.city,
     'state_province':data.state_province,
     'country':data.country,
     'contact': data.detail.id,
    }
    let resp = await axios.post(contentApi.addresses, theData, contentApi.config)
    return resp;
   }
   catch(e){
    return e;
   }
  },

   UPDATE_ADDRESS: async ({commit}, data) =>{
     try{
      const contentApi = new ContentApi();
      let theData = {
       'address_line1':data.address_line1,
       'address_line2':data.address_line2,
       'postal_code':data.postal_code,
       'city':data.city,
       'id':data.id,
       'state_province':data.state_province,
       'country':data.country,
       'contact': data.detail.id,
      }
      let resp = await axios.put(contentApi.addresses+theData.id+'/', theData, contentApi.config)
      return resp;
     }
     catch(e){
      return e;
     }
    },

   DELETE_ADDRESS: async ({commit}, data) =>{
    try{
      const contentApi = new ContentApi();
      let resp = await axios.delete(contentApi.addresses+data.id+'/', contentApi.config)
      return resp;
    }
    catch(e){
     console.log(e);
     return e;
    }
   },

}


module.exports = addressesActions;
