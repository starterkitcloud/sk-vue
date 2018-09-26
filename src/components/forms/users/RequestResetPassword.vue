
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
         <h1>You're almost done!</h1>
         <p>Check your email and click on the link to reset your password.</p>
        </div>
       </v-card-text>
     </v-card>
    </v-flex>
  </v-layout>
  <v-layout v-else align-center justify-center>
   <v-flex sm8 md6  align-center justify-space-around>
     <v-card   class="elevation-4">
        <v-card-text>
            <v-alert v-for="error in submitErrors" type="error" :value="true">
              {{error}}
            </v-alert>

            <v-form @submit.prevent="sendResetRequest()" v-model="valid" ref="resetForm">
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
                required
                validate-on-blur
              ></v-text-field>
              <v-btn type="submit" color="primary">Reset Password</v-btn>
            </v-form>

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
     emailRules: [
       v => !!v || 'Email is required',
       v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid'
     ],
      loading:false,
      submitErrors: [],
      valid: false,
      success: false,
    }
  },

  async mounted(){
    console.log("mounted")
  },

  methods: {
   async sendResetRequest(){

     if(this.$refs.resetForm.validate()){
       this.loading = true;
       let theData = {
        'email': this.email,
       }
       let resp = await store.dispatch('REQUEST_RESET_PASSWORD', theData)
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
