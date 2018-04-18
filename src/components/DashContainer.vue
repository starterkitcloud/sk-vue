<template>
 <div>
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
   loading:{
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
        return store.getters.accountDetails
      }
   },
  },
  async mounted(){

   if(localStorage.getItem('authToken') != null){
    console.log("FUUUUUCK")
    console.log(localStorage.getItem('authToken'))
    console.log(localStorage.getItem('authToken'))
    console.log(localStorage.getItem('authToken'))
    console.log(localStorage.getItem('authToken'))
    
     let tokenIsValid = await store.dispatch('CHECK_TOKEN_IS_VALID');
     if(tokenIsValid){
       store.dispatch('LOAD_ACCOUNT_DETAILS');
     }
     else{
      this.signOut()
      this.$router.push('login')
     }
   }
   else{
    store.dispatch('LOG_USER_OUT')
    this.$router.push('login')
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
