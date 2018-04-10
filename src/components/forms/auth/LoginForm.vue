
<template>
  <div class="row">
    <div class="container login-area-wrap stnd-form-wrap">
      <div v-if="globalLoad" class="animated-loader">Loading...</div>
      <div v-else class="col-md-8 col-md-offset-2">

        <div class="col-md-12 logo-wrap">
          <img src="../../../assets/sk-logo.png">
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
  </div>
</template>

<script>
import store from '../../../store/store.js'
import ContentApi from '../../../api.js'
const contentApi = new ContentApi();

export default {
 data () {
    return {
      username: '',
      password: '',
      loading:false,
      submitErrors: [],
      invalid: false,
    }
  },
  methods: {
   notValidForm(){
    this.submitErrors = [];
    this.submitErrors.push("You must provide both a username and password.");
    this.invalid = true;
    setTimeout(()=>{ this.invalid = false }, 300);
   },
   authSuccess(response){
    this.loading = true;
    this.invalid = false;
   },
   authFailure(e){
    this.invalid = true;
    this.loading = false;
    this.submitErrors.push(e.response.data.error_description);
    setTimeout(()=>{ this.invalid = false }, 300);
   },

   async authenticate(){
    this.submitErrors = [];
    let resp = await store.dispatch('AUTHENTICATE', this._data)
    if(resp.status == 200){
     this.authSuccess(resp);
    }
    else{
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

.logo-wrap{
 display:flex;
 flex-direction: row;
 justify-content: center;
 img{
  width:200px;
  height:200px;
 }

}


.login-area-wrap{
 form{
  border:solid;
  padding:20px;
  border-color:$primary-contrast;
  border-width:1px;
 }

 .auth-direct{
  margin-top:10px;
  text-align:center;
  color:$font-color;
  a{
   text-decoration:underline;
  }
 }

 @keyframes shake {
   10%, 90% {
     transform: translate3d(-4px, 0, 0);
   }

   20%, 80% {
     transform: translate3d(10px, 0, 0);
   }

   30%, 50%, 70% {
     transform: translate3d(-10px, 0, 0);
   }

   40%, 60% {
     transform: translate3d(4px, 0, 0);
   }
 }

 form.invalid{
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
 }

}

</style>
