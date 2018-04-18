import Vue from 'vue'
import Router from 'vue-router'

import LoginForm from '../components/forms/auth/LoginForm.vue'
import DashContainer from '../components/DashContainer.vue'


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
    }
  ]
})
