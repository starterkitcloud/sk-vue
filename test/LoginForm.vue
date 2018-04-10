
<template>
  <div class="row">
    <div class="container">
      <div class="col-md-4 col-md-offset-4">
        <div class="col-md-12">
          <img src="../../../assets/v-logo.png" style="width:100%;margin-bottom:20px;">

        </div>

        <div class="col-md-12">
         <ul class="error-list " v-for="error in submitErrors">
          <li class="error">{{error}}</li>
         </ul>
        </div>
        <div class="col-md-12">
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
import store from '../../../store.js'
import axios from 'axios'
import ContentApi from '../../../api.js'
const contentApi = new ContentApi();

import qs from 'qs'

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
   authenticate(){
    this.submitErrors = [];
    let data = {
     username:this.username,
     password:this.password,
     client_id:contentApi.clientID,//application client
     grant_type: 'password'
    }
    let headers = {
     'Content-Type': 'application/x-www-form-urlencoded',
    }
    axios.post(contentApi.authToken, qs.stringify(data), headers)
     .then( response => {
       this.authSuccess(response);
     })
     .catch(e => {
       console.log(e);
       this.authFailure(e);
     });
   },
   authSuccess(response){
    this.loading = true;
    this.invalid = false;
    localStorage.setItem("authToken", response.data.access_token);
    store.state.authenticated = true;
   },
   authFailure(e){
    this.invalid = true;
    this.loading = false;
    this.submitErrors.push(e.response.data.error_description);
    setTimeout(()=>{ this.invalid = false }, 300);
    console.log(e);
   },
   attemptLogin(){
    if(this.username == '' || this.password == ''){
      this.notValidForm()
    }
    else{
     this.authenticate();
    }
   },
  },
}
</script>

<style lang="scss">
@import '../../colors';
.auth-direct{
 margin-top:10px;
 text-align:center;
 color:$font-color;
 a{
  text-decoration:underline;
 }
}
//look in to the proper way to animate vue components.
@keyframes slideInFromTop {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
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


form{
 color:$font-color;
 input.form-control{
  border-radius:0px;
 }
 border:solid;
 padding:40px;
 border-color:$primary-contrast;
 border-width:1px;
 border-radius:10px;
}

.error-list{
 margin:0px;
 padding:0px;

 li.error{
  /* This section calls the slideInFromLeft animation we defined above */
  animation: .1s ease-out 0s 1 slideInFromTop;
  list-style:none;
  background-color:$primary-mid;
  color:$font-color;
  margin-bottom:10px;
  padding:10px;
 }
}

.animated-loader,
.animated-loader:before,
.animated-loader:after {
  background: $primary-contrast;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.animated-loader {
  color: $primary-contrast;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.animated-loader:before,
.animated-loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.animated-loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.animated-loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>
