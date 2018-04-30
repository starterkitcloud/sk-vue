
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
            <v-alert v-for="error in submitErrors" type="error" :value="true">
              {{error}}
            </v-alert>

            <v-form @submit.prevent="signUp()" v-model="valid" ref="signupForm">
              <v-text-field
                label="Username"
                v-model="username"
                :rules="usernameRules"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                validate-on-blur
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field
                label="Repeat Password"
                v-model="repeatPassword"
                type="password"
                :rules="repeatPasswordRules"
                validate-on-blur
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Signup</v-btn>
            </v-form>
        </v-card-text>
     </v-card>
   </v-flex>
  </v-layout>


  <v-layout justify-center>
   <v-flex md6  >
    <div class="text-xs-center">
     <br>
     <p>Already registered? <a  href="#/login">Login</a> </p>
    </div>
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
       v => !!v || 'Email address is required',
     ],
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      password: '',
      passwordRules: [
       v => !!v || 'Password is required',
      ],
      repeatPassword: '',
      repeatPasswordRules: [
       v => !!v || 'Repeat password is required',
       v => v === this.password || 'Must match the password field',
      ],
      loading:false,
      submitErrors: [],
      valid: false,
    }
  },

  async mounted(){
   console.log("mounted")
  },

  methods: {

   signUp(){
    if(this.$refs.signupForm.validate()){
      console.log("sign the user up.")
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
