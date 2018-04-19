<template>
 <div>
  <div v-if="globalLoad" class="animated-loader">Loading...</div>
  <div v-else >
  <div class="dash-container">
      <!--end else in authenticated condition-->
      <img src="../assets/sk-logo.png">

  </div>
  <div class="dash-info">
   <h1>Start Building</h1>
  </div>
  <div class="dash-info">
   <p>Logged in as {{accountDetails.email}}</p>
  </div>
  <div class="dash-info">
   <a class="btn btn-primary" @click="signOut()">Logout</a>
  </div>
 </div>
 </div>
</template>

<script>

import store from '../store/store.js'

export default {
  methods:{
   signOut(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenLastChecked');
    store.dispatch('LOG_USER_OUT')
    this.$router.push('login')
   }
  },
  computed:{
   globalLoad:{
    get(){
     return store.getters.loading;
    }
   },
   authenticated: {
      get(){
        return store.getters.authenticated;
      }
   },
   accountDetails: {
      get(){
        return store.getters.accountDetails;
      }
   },
  },
  async mounted(){
   store.dispatch('SET_LOADER', true);

   if( localStorage.getItem('authToken') != null ){
    //if so.... check to see the last time this token has been checked as valid/not expired.
    //let's just say 15 minutes.
    let now = new Date();
    let then = new Date(localStorage.getItem("tokenLastChecked"))
    let delta = now-then;

    if(delta > 900000){//check token is valid every 15 minutes. 
     store.dispatch('SET_LOADER', true);
     let tokenIsValid = await store.dispatch('CHECK_TOKEN_IS_VALID');

     if(!tokenIsValid){
      this.signOut();
      this.$router.push('login');
     }
    }
    //we assume the token is valid at this point
    //the only way it wouldn't be valid is if someone deleted the token from the django admin on the api end
    await store.dispatch('LOAD_ACCOUNT_DETAILS');
    store.dispatch('SET_LOADER', false);
   }
   else{// there is no token
    store.dispatch('SET_LOADER', false);
    this.$router.push('login');
   }
  }
}
</script>

<style lang="scss">
@import 'colors';
.dash-container{
 display:flex;
 flex-direction: row;
 justify-content: center;
}
.dash-info{
 display:flex;
 flex-direction: row;
 justify-content: center;
}

</style>
