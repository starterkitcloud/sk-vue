<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>
import LoginForm from './forms/auth/LoginForm.vue'
import DashContainer from './DashContainer.vue'

export default {
  name: 'app',
  components:{
    LoginForm,
    DashContainer,
  },
}
</script>

<style lang="scss">
@import 'colors';

html{
  overflow-x:hidden;
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
