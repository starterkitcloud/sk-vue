import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';




let contactInfosActions = {
 CREATE_CONTACT_INFOS: async ({commit}, data) =>{
   try{
    const contentApi = new ContentApi();
    let theData = {
     'value':data.value,
     'medium':data.medium,
     'contact': data.detail.id,
    }
    let resp = await axios.post(contentApi.contactInfos, theData, contentApi.config)
    return resp;
   }
   catch(e){
    return e;
   }
  },

  UPDATE_CONTACT_INFOS: async ({commit}, data) =>{
    try{
     const contentApi = new ContentApi();
     let theData = {
      'value':data.value,
      'medium':data.medium,
      'id':data.id,
      'contact': data.detail.id,
     }

     let resp = await axios.put(contentApi.contactInfos+theData.id+'/', theData, contentApi.config)
     return resp;
    }
    catch(e){
     return e;
    }
   },
   DELETE_CONTACT_INFOS: async ({commit}, data) =>{
    try{
      const contentApi = new ContentApi();
      let resp = await axios.delete(contentApi.contactInfos+data.id+'/', contentApi.config)
      return resp;
    }
    catch(e){
     console.log(e);
     return e;
    }
   },


 //  try{
 //   const contentApi = new ContentApi();
 //   let theData = {
 //    'first_name':data.detail.first_name,
 //    'last_name':data.detail.last_name,
 //    'birthday':data.detail.birthday
 //   }
 //   let theId = data.detail.id
 //   let resp = await axios.put(contentApi.contacts+theId+'/', theData, contentApi.config)
 //   return resp;
 //  }
 //  catch(e){
 //   return e;
 //  }
 // },
}


module.exports = contactInfosActions;
