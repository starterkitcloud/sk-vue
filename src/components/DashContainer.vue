<template>
 <v-app id="dash">
  <v-container fill-height v-if="globalLoad">
    <v-layout  flex align-center justify-center>
      <v-progress-circular :size="70" :width="7"  indeterminate color="primary"></v-progress-circular>
    </v-layout>
 </v-container>
  <v-container v-else>
   <v-layout justify-space-around>
    <v-flex xs3 sm2>
       <img class="logo-main" src="../assets/sk-logo.png">
    </v-flex>
   </v-layout>
   <v-layout justify-space-around>
    <v-flex sm6  >
     <div class="text-xs-center">
       <h1>Logged in as {{accountDetails.email}}</h1>
      <h2>start building features now!</h2>
       <v-btn @click="signOut()" color="primary">Logout</v-btn>
     </div>
    </v-flex>
   </v-layout>

  </v-container>
 </v-app>
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
.logo-main{
 width:100%;
}
</style>
