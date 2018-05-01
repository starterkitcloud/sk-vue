
<template>
 <v-app id="login">
 <v-container  >
  <!-- <v-progress-linear v-if="globalLoad" :indeterminate="true"></v-progress-linear> -->
  <v-layout justify-space-around>
   <v-flex xs3 sm2>
      <img class="logo-main" src="../../../assets/sk-logo.png">
   </v-flex>

  </v-layout>
  <br>
  <v-layout align-center justify-center>
   <v-flex sm8 md6  align-center justify-space-around>
     <v-card   class="elevation-4">
        <v-card-text>
          <h1>You are now registered! <a href="#/login">Login</a></h1>
        </v-card-text>
     </v-card>
   </v-flex>
  </v-layout>
 </v-container>
 </v-app>
</template>

<script>
import store from '../../../store/store.js'
export default {
 data () {
    return {
     email: '',
     token: '',
     valid: false,
     loading: true,
    }
  },

  async mounted(){
    this.email = this.$route.query.email;
    this.token = this.$route.query.token;
    let theData = {'email':this.email,'token':this.token}
    let resp = await store.dispatch('CONFIRM_USER_ACCOUNT', theData);
  },

  methods: {

   signUp(){
    console.log("sign the user up.")
   },

  },

  computed:{
   globalLoad:{
     get(){
      return store.getters.loading;
     }
   },
  }
}
</script>

<style lang="scss">
@import '../../colors';
.logo-main{
 width:100%;
}
</style>
