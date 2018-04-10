import Vue from 'vue'
import axios from 'axios';
import LoginForm from '../src/components/forms/auth/LoginForm.vue';
import ContentApi from '../src/api.js'
import { shallow } from 'vue-test-utils'
const contentApi = new ContentApi();
import store from '../src/store/store.js'

describe('LoginForm component in non loading state', () => {
 let cmp
 //sets up the component for testing.
 beforeEach(()=>{
  cmp = shallow(LoginForm,{});
  store.state.loading = false; //default test the component in a non loading state.
 });


 it('has an attemptLogin function in the methods', () => {
  expect(typeof LoginForm.methods.attemptLogin).toBe('function');
 })

 it('should have a username field and input', ()=>{
  cmp.update();
  expect(cmp.vm.$el.textContent).toContain('Username');
  expect(cmp.vm.$el.querySelectorAll('input[name="username"]').length).toBe(1);

 });

 it('should have a password field', ()=>{
  expect(cmp.vm.$el.textContent).toContain('Password');
  expect(cmp.vm.$el.querySelectorAll('input[name="password"]').length).toBe(1);
 });

 it('should not allow the form to be submitted with empty username', ()=>{
  cmp.vm.username = '';
  cmp.vm.password = 'top_secret';

  const theForm = cmp.find('form');
  theForm.trigger('submit');
  //should set a single error in the data
  expect(cmp.vm.submitErrors.length).toBe(1);
  expect(cmp.findAll('li.error').length).toBe(1);
  expect(cmp.vm.loading).toBe(false);
  //should not show the animated loader.
  expect(cmp.findAll('.animated-loader').length).toBe(0);
 });

 it('should not allow the form to be submitted with empty password', ()=>{
  cmp.vm.username = 'spencercooley';
  cmp.vm.password = '';

  const theForm = cmp.find('form');
  theForm.trigger('submit');
  //should set a single error in the data
  expect(cmp.vm.submitErrors.length).toBe(1);
  expect(cmp.findAll('li.error').length).toBe(1);
  expect(cmp.vm.loading).toBe(false);
  //should not show the animated loader.
  expect(cmp.findAll('.animated-loader').length).toBe(0);
 });

 it('should trigger attemptLogin on submit of form',()=>{
  // const spy = spyOn(cmp.vm, 'attemptLogin');
  // cmp.update();
  const stub = jest.fn();
  cmp.setMethods({ attemptLogin: stub });
  cmp.vm.username = '';
  cmp.vm.password = 'top_secret';
  const theForm = cmp.find('form');
  theForm.trigger('submit');
  expect(stub).toBeCalled();
 })

 it('should add shake animation with css class invalid if the login is not successful', ()=>{
  cmp.vm.username = '';
  cmp.vm.password = 'top_secret';
  expect(cmp.find('form').attributes().class).toBe('');
  const theForm = cmp.find('form');
  theForm.trigger('submit');
  expect(cmp.find('form').attributes().class).toBe('invalid');
 });

 it('should not accumulate error messages. only set mesages on a per submit basis.', ()=>{
  cmp.vm.username = '';
  cmp.vm.password = 'top_secret';
  const theForm = cmp.find('form');
  //multiple submits
  theForm.trigger('submit');
  theForm.trigger('submit');
  theForm.trigger('submit');
  theForm.trigger('submit');
  //should set a single error in the data
  expect(cmp.vm.submitErrors.length).toBe(1);
  expect(cmp.findAll('li.error').length).toBe(1);
  expect(cmp.vm.loading).toBe(false);
  //should not show the animated loader.
  expect(cmp.findAll('.animated-loader').length).toBe(0);
 });

 it('should not show a form while loading', ()=>{
   //test dom elements when the loading state is true
   cmp.vm.loading = true;
   cmp.update();
   //there should be no form.
   expect(cmp.findAll('form').length).toBe(0);
   expect(cmp.findAll('.animated-loader').length).toBe(1);
 });

 it('has an authSuccess function in the methods', () => {
  expect(typeof LoginForm.methods.authSuccess).toBe('function');
 });

 it('has an notValidForm function in the methods', () => {
  expect(typeof LoginForm.methods.notValidForm).toBe('function');
 });

 it('has an authSuccess function in the methods', () => {
  expect(typeof LoginForm.methods.authFailure).toBe('function');
 });

 it('should have invalid set to false on successful login and remove the form.', () =>{
  let apiResponse = {
    'data':{
     'access_token': 'uYPlFOapaOaElDmW7V0Aq4mY2szJgo',
     'scope': 'groups write read',
     'token_type': 'Bearer',
     'expires_in': 36000,
     'refresh_token': 'EtQUYtximygPUPACAHKIY7nVmqKM49'
    }
  };
  //the method called when status code is 200
  cmp.vm.authSuccess(apiResponse);
  cmp.update();
  expect(cmp.vm.invalid).toBe(false);
  expect(cmp.vm.loading).toBe(true);
  //correct elements are showing.
  expect(cmp.findAll('form').length).toBe(0);
  expect(cmp.findAll('.animated-loader').length).toBe(1);
  //check that localStorage has been set
  expect(localStorage.getItem('authToken')).toBe('uYPlFOapaOaElDmW7V0Aq4mY2szJgo');
 });

 it('should have invalid set to true on failed login and show the form.', () =>{
  let errorResponse = {
    'response':{
     'data':{
      'error': 'invalid_grant',
      'error_description': 'Invalid credentials given.'
     }
    }
   };
   //the method called when status code is 401
   cmp.vm.authFailure(errorResponse);
   cmp.update();
   expect(cmp.vm.invalid).toBe(true);
   expect(cmp.vm.loading).toBe(false);
   //correct elements are showing.
   expect(cmp.findAll('form').length).toBe(1);
   expect(cmp.findAll('.animated-loader').length).toBe(0);
   //check that an error is present in the dom and the data.
   expect(cmp.vm.submitErrors.length).toBe(1);
   expect(cmp.findAll('li.error').length).toBe(1);
   expect(cmp.vm.submitErrors[0]).toBe('Invalid credentials given.');
 });

 it('should trigger attemptLogin on form submit.', ()=>{
  const spy = spyOn(cmp.vm, 'attemptLogin')
  cmp.update()
  cmp.vm.username = 'spencercooley'
  cmp.vm.password = 'top_secret'
  const theForm = cmp.find('form');
  theForm.trigger('submit');
  expect(cmp.vm.attemptLogin).toBeCalled()
 });

});
