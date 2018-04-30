
<template>
 <v-app id="login">
 <v-container  >
  <v-layout justify-space-around=true>
   <v-flex xs3 sm2>

      <img class="logo-main" src="../../../assets/sk-logo.png">

   </v-flex>

  </v-layout>

  <v-layout align-center justify-center>
   <v-flex sm8 md6  align-center justify-space-around>
     <v-card   class="elevation-1">
        <v-card-text>
            <v-form @submit="doSomething()" v-model="valid" ref="form">
              <v-text-field
                label="Username"
                v-model="username"
                required
                validate-on-blur
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                type="password"
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
     <p>Not registered? <a  href="#notimplemented">Sign Up</a> </p>
     <p>Forgot Password? <a  href="#notimplemented">Reset Password</a> </p>
    </div>
   </v-flex>
  </v-layout>


 </v-container>
 </v-app>



  <!-- <div class="row">
    <div class="container login-area-wrap stnd-form-wrap">
      <div v-if="globalLoad" class="animated-loader">Loading...</div>
      <div v-else class="col-md-8 col-md-offset-2">

        <div class="col-md-12 logo-wrap">

        </div>

        <div class="col-md-12">
         <ul class="error-list " v-for="error in submitErrors">
          <li class="error">{{error}}</li>
         </ul>
        </div>
        <div class="col-md-12 ">
         <div v-if="loading" class="animated-loader">Loading...</div>
         <form v-else v-on:submit.prevent="attemptLogin" v-bind:class="{ invalid: invalid }" >
           <label>Username:</label>
           <input type="text" name="username" v-model="username" class="form-control" >
           <br>
           <label>Password:</label>
           <input  type="password" name="password" v-model="password" class="form-control">
           <br>
           <input type="submit" value="Login" class="btn btn-default submit-btn">
         </form>
        </div>
        <div class="col-md-12">
         <p class="auth-direct">Not registered? <a  href="#notimplemented">Sign Up</a></p>
         <p class="auth-direct">Forgot Password? <a  href="#notimplemented">Reset Password</a></p>
        </div>

      </div>
    </div>
  </div> -->
</template>

<script>
import store from '../../../store/store.js'

export default {
 data () {
    return {
      username: '',
      password: '',
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

    if(delta > 900000){//check token is valid every 15 minutes.
     store.dispatch('SET_LOADER', true)
     let tokenIsValid = await store.dispatch('CHECK_TOKEN_IS_VALID');
    }
   }

   //redirect to the dashboard if the user is authenticated.
   if(store.getters.authenticated){
    this.$router.push('/')
   }

  },
  methods: {
   notValidForm(){
    this.submitErrors = [];
    this.submitErrors.push("You must provide both a username and password.");
    this.invalid = true;
    setTimeout(()=>{ this.invalid = false }, 300);
   },
   doSomething(){
    console.log("hello world. ")
   },
   authSuccess(response){
    console.log("hello hello hello ")
    localStorage.setItem("authToken", response.data.access_token);
    localStorage.setItem("tokenLastChecked", new Date())
    this.loading = true;
    this.invalid = false;
    this.$router.push('/')
   },
   authFailure(e){
    this.invalid = true;
    this.loading = false;
    this.submitErrors.push(e.response.data.error_description);
    setTimeout(()=>{ this.invalid = false }, 300);
   },

   async authenticate(){
    this.submitErrors = [];
    store.dispatch('SET_LOADER', true)
    let resp = await store.dispatch('AUTHENTICATE', this._data)
    if(resp.status == 200){
     store.dispatch('SET_LOADER', false)
     this.authSuccess(resp);
    }
    else{
     store.dispatch('SET_LOADER', false)
     this.authFailure(resp);
    }
   },

   attemptLogin(){
    if(this.username == '' || this.password == ''){
      this.notValidForm();
    }
    else{
     this.authenticate();
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
