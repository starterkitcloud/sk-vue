
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
  <v-layout v-if="success" align-center justify-center >
   <v-flex sm8 md6  align-center justify-space-around>
     <v-card   class="elevation-4">
       <v-card-text>
        <div class="text-xs-center">
         <h1>Your password has been reset successfully!</h1>
         <p><a  href="#/login">Login</a> </p>
        </div>
       </v-card-text>
     </v-card>
    </v-flex>
  </v-layout>
  <v-layout v-else align-center justify-center>
   <v-flex sm8 md6  align-center justify-space-around>
     <v-container fill-height v-if="globalLoad">
       <v-layout  flex align-center justify-center>
         <v-progress-circular :size="70" :width="7"  indeterminate color="primary"></v-progress-circular>
       </v-layout>
    </v-container>
     <v-card v-else  class="elevation-4">
        <v-card-text v-if='validToken'>
            <v-alert v-for="error in submitErrors" type="error" :value="true">
              {{error}}
            </v-alert>

            <v-form @submit.prevent="sendResetPassword()" v-model="valid" ref="resetForm">
              <v-text-field
                label="new password"
                v-model="password"
                :type="'password'"
                required
                validate-on-blur
              ></v-text-field>
              <v-text-field
                label="repeat password"
                v-model="password_repeat"
                :type="'password'"
                :rules="passwordRules"
                required
                validate-on-blur
              ></v-text-field>
              <v-btn type="submit" color="primary">Reset Password</v-btn>
            </v-form>

        </v-card-text>
        <v-card-text v-else>
          The url provided is not valid
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
     password: '',
     password_repeat: '',
     passwordRules: [
       v => !!v || 'Email is required',
       v => this.password == this.password_repeat || 'password confirmation must match password'
     ],
      loading:false,
      submitErrors: [],
      valid: false,
      validToken: false,
      success: false,
    }
  },

  mounted(){
    this.$nextTick(async ()=> {
      store.dispatch('SET_LOADER', true)
      //check to see that token is valid.
      let theData = {
        "token": this.$router.history.current.query.token,
        "email": this.$router.history.current.query.email
      }

      let resp = await store.dispatch('CHECK_RESET_TOKEN', theData)

      if(resp.status == 200){
       store.dispatch('SET_LOADER', false)
       this.validToken = true;
      }
      else{
        store.dispatch('SET_LOADER', false)
        this.validToken = false
        //do something else
      }
      console.log(resp)
    })
  },
  methods: {
   async sendResetPassword(){
     if(this.$refs.resetForm.validate()){
       this.loading = true;

       let theData = {
        'new_password': this.password,
        'token': this.$router.history.current.query.token,
        'email': this.$router.history.current.query.email
       }

       let resp = await store.dispatch('RESET_PASSWORD', theData)
       console.log(resp)
       if(resp.status == 200){
        this.success = true;
       }
       else{
        this.loading = false;
        this.submitErrors = []
        for (const [key, value] of Object.entries(resp.response.data)) {
          this.submitErrors.push(value[0]);
        }
       }
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
