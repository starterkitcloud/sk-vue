import Vue from 'vue'
import Router from 'vue-router'

import LoginForm from '../components/forms/auth/LoginForm.vue'
import SignupForm from '../components/forms/users/SignupForm.vue'
import ResetPassword from '../components/forms/users/ResetPassword.vue'
import DashContainer from '../components/DashContainer.vue'
import ConfirmAccount from '../components/forms/users/ConfirmAccount.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      // the main view where the form is held.
      path: '/',
      name: 'dash',
      component: DashContainer
    },
    {
      // on successful submission of the form and the 2fa code, will redirect to /thanks/
      path: '/login/',
      name: 'login',
      component: LoginForm
    },
    {
      // on successful submission of the form and the 2fa code, will redirect to /thanks/
      path: '/signup/',
      name: 'signup',
      component: SignupForm
    },
    {
      // on successful submission of the form and the 2fa code, will redirect to /thanks/
      path: '/reset/',
      name: 'reset',
      component: ResetPassword
    },
    {
      // on successful submission of the form and the 2fa code, will redirect to /thanks/
      path: '/confirm-account/',
      name: 'confirm',
      component: ConfirmAccount
    }
  ]
})
