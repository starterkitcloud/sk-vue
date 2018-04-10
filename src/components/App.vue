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

</style>
