
<template>
 <v-app id="login">
  <v-container fill-height v-if="globalLoad">
    <v-layout  flex align-center justify-center>
      <v-progress-circular :size="70" :width="7"  indeterminate color="primary"></v-progress-circular>
    </v-layout>
  </v-container>
  <v-container v-else>
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
            <v-alert v-for="error in submitErrors" type="error" :value="true" transition="scale-transition" origin="center center">
              {{error}}
            </v-alert>

            <v-form @submit.prevent="attemptLogin()" v-model="valid" ref="loginForm" >
              <v-text-field
                label="Username"
                v-model="username"
                :rules="usernameRules"
                :loading="loading"
                :disabled="loading"
                required
                validate-on-blur
              ></v-text-field>

              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                :rules="passwordRules"
                :loading="loading"
                :disabled="loading"
                validate-on-blur
                required
              ></v-text-field>

              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
        </v-card-text>
     </v-card>
   </v-flex>
  </v-layout>


  <v-layout justify-center>
   <v-flex md6  >
    <div class="text-xs-center">
     <br>
     <p>Not registered? <a  href="#/signup/">Sign Up</a> </p>
     <p>Forgot Password? <a  href="#/request-reset/">Reset Password</a> </p>
    </div>
   </v-flex>
  </v-layout>
 </div><!--ends the else div-->

 </v-container>
 </v-app>

</template>

<script>
import store from '../../../store/store.js'

export default {
 data () {
    return {
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      password: '',
      passwordRules: [
       v => !!v || 'Password is required',
      ],
      loading:false,
      submitErrors: [],
      valid: false,
    }
  },

  async mounted(){
   //check that a token is in localstorage
   if( localStorage.getItem('authToken') != null ){
    //if so.... check to see the last time this token has been checked as valid/not expired.
    let now = new Date()
    let then = new Date(localStorage.getItem("tokenLastChecked"))
    let delta = now-then

    if(delta > 900000){//check token is valid every 15 minutes.900000
     store.dispatch('SET_LOADER', true)
     let tokenIsValid = await store.dispatch('CHECK_TOKEN_IS_VALID');
    }
    else{
     //we will assume that this token is still valid and redirect to the dash page.
     store.dispatch('ASSUME_AUTH')
    }
   }
   //redirect to the dashboard if the user is authenticated.
   if(store.getters.authenticated){
    this.$router.push('/')
   }
  },

  methods: {

   doSomething(){

   },
   authSuccess(response){
    localStorage.setItem("authToken", response.data.access_token);
    localStorage.setItem("tokenLastChecked", new Date())
    this.loading = true;
    this.$router.push('/')
   },
   authFailure(e){
    this.loading = false;
    this.submitErrors.push(e.response.data.error_description);
   },
   async authenticate(){
    this.loading = true;
    this.submitErrors = [];
    let resp = await store.dispatch('AUTHENTICATE', this._data)
    if(resp.status == 200){
     this.authSuccess(resp);
    }
    else{
     this.loading=false
     this.authFailure(resp);
    }
   },
   attemptLogin(){
     if(this.$refs.loginForm.validate()){
      this.authenticate();
     }
     else{
      console.log("form not valid")
     }
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
