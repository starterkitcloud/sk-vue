<template>
  <div id="app">
      <div v-if="authenticated">
       <DashContainer></DashContainer>
      </div>
      <div v-else>
        <LoginForm></LoginForm>
      </div>
      <!--end else in authenticated condition-->
  </div>
</template>

<script>
import LoginForm from './forms/auth/LoginForm.vue'
import DashContainer from './DashContainer.vue'
import store from '../store/store.js'

export default {
  name: 'app',
  components:{
    LoginForm,
    DashContainer,
  },
  methods:{
   openKitchenSink:(details, e)=>{
     store.dispatch("LOAD_KITCHEN_SINK", details );
   },
   signOut(){
    localStorage.removeItem('authToken');
    location.reload();
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
   detailStaged: {
      get(){
        return store.getters.detailStaged
      }
   },
  },
  async mounted(){
    let tokenIsValid = await store.dispatch('CHECK_TOKEN_IS_VALID');
    console.log("finished loading")
    console.log(tokenIsValid)
    if(tokenIsValid){
      store.dispatch('LOAD_ACCOUNT_DETAILS');
    }
  }
}
</script>

<style lang="scss">
@import 'colors';
@import 'colors';
body{
  font-family: 'Roboto', sans-serif;
  background-color:$base;
  overflow-x:hidden;
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

html{
  overflow-x:hidden;
  padding-top:52px;
  padding-bottom:60px;
  input[type="color"],
  input[type="date"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="email"],
  input[type="month"],
  input[type="number"],
  input[type="password"],
  input[type="search"],
  input[type="tel"],
  input[type="text"],
  input[type="time"],
  input[type="url"],
  input[type="week"],
  textarea {
    font-size: 16px;
  }
}


</style>
