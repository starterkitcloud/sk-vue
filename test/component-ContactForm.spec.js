import Vue from 'vue'
import axios from 'axios';
import ContactForm from '../src/components/forms/ContactForm.vue';
import ContentApi from '../src/api.js'
import { shallow } from 'vue-test-utils'
import store from '../src/store/store.js'
const contentApi = new ContentApi();

describe('ContactForm component', () => {

 let cmp;

 let testContacts =
 [{'first_name':'Steve','last_name':'Apple','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':19},{'first_name':'ethereum','last_name':'blockchain','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':38},{'first_name':'Vitalik','last_name':'Buterin','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':13},{'first_name':'Spencer','last_name':'Cooley','birthday':'1987-04-19','contact_infos':[{'value':'test@email.com','medium':'email'},{'value':'2107893578','medium':'phone'},{'value':'test@email.com','medium':'email'}],'addresses':[{'address_line1':'1915 2nd Avenue','address_line2':'#304','postal_code':'98101','city':'Seattle','state_province':'WA','country':'United States','contact':1}],'id':1},{'first_name':'ethereum','last_name':'crypto','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':40},{'first_name':'Another','last_name':'Dogg','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':24},{'first_name':'Snoop','last_name':'Dogg','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':23},{'first_name':'more','last_name':'dogggs','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':25},{'first_name':'Donald','last_name':'Duck','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':17},{'first_name':'tyler','last_name':'durden','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':30},{'first_name':'Monster','last_name':'Elephant','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':21},{'first_name':'Pepe','last_name':'Frog','birthday':'2017-12-03','contact_infos':[],'addresses':[],'id':5},{'first_name':'dogg','last_name':'guy','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':31},{'first_name':'baby','last_name':'mack','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':42},{'first_name':'Zombie','last_name':'Monster','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':18},{'first_name':'Satoshi','last_name':'Nakamoto','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':20},{'first_name':'Mackenzie','last_name':'Olsen','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':41},{'first_name':'Joe','last_name':'Rogan','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':16},{'first_name':'Howard','last_name':'Stern','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':15},{'first_name':'Monster','last_name':'Stern','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':27},{'first_name':'Tyler','last_name':'Steven','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':29},{'first_name':'ethereum','last_name':'token','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':39},{'first_name':'Donald','last_name':'Truck','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':26},{'first_name':'President','last_name':'Trump','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':35},{'first_name':'Ivanka','last_name':'Trump','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':22},{'first_name':'Melania','last_name':'Trump','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':37},{'first_name':'Donald','last_name':'Trump','birthday':'2017-12-03','contact_infos':[],'addresses':[],'id':12},{'first_name':'Steven','last_name':'Tyler','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':28},{'first_name':'Lil','last_name':'Wayne','birthday':'2017-12-03','contact_infos':[],'addresses':[],'id':9},{'first_name':'todd','last_name':'wilson','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':34},{'first_name':'Gary','last_name':'Wilson','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':32},{'first_name':'Fred','last_name':'Wilson','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':33},{'first_name':'Alien','last_name':'Zombie','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':14}];

 let contactId1 ={
  'first_name':'Spencer',
  'last_name':'Cooley',
  'birthday':'1987-04-19',
  'contact_infos':[
    {'value':'test@email.com','medium':'email'},
    {'value':'2107893578','medium':'phone'},
    {'value':'test@email.com','medium':'email'}
   ],
   'addresses':[
    {'address_line1':'1915 2nd Avenue','address_line2':'#304','postal_code':'98101','city':'Seattle','state_province':'WA','country':'United States','contact':1}
   ],
   'id':1
 };

 //sets up the component for testing.
 beforeEach(()=>{
  //reset the store.
  //all tests should start with this store state.
  store.state.kitchenSink = {};
  //notes on when this is need for the tests.
  //if a form is open a kitchen sink is also open.
  //since the information is passed in as props it is irrelevent what the vuex kitchen sink has in it for this particular components
  //there just needs to be something set so that we can test that certain methods ture in false eventually.
  //the data itself is not important to the component.
  let copiedObj = JSON.parse(JSON.stringify(testContacts))
  store.commit('SET_CONTACTS_LIST', { contacts: copiedObj });
  store.dispatch('LOAD_DETAIL_STAGE', 1); //sets detailed stage to the same as contactId1 above.

  cmp = shallow(ContactForm,{
   propsData:{
     options: {
      'type':'contact',
       'action':'create',
       'detail':{
        'first_name':'hello',
        'last_name':'another',
        'birthday':'2012-02-22',
        'id':false
       }
     }
   }
  });
  cmp.update();
 });

 it('should show new contact title if contactId is set to false in the props. should show edit contact title when not false',()=>{
  expect(cmp.find('#c-form-title').text()).toBe('Add New Contact');
  cmp.vm.detail.id = 2;
  cmp.update();
  expect(cmp.find('#c-form-title').text()).toBe('Edit Contact');
 });

 it('should have a props item called option that is of type object', ()=>{
  expect(typeof cmp.props('options')).toBe('object');
 });

 it('should set first_name, last_name, and birthday in data from options in prop object', ()=>{
  expect(cmp.vm.detail.first_name).toBe('hello');
  expect(cmp.vm.detail.last_name).toBe('another');
  expect(cmp.vm.detail.birthday).toBe('2012-02-22');
  expect(cmp.vm.detail.id).toBe(false);
  expect(cmp.vm.errors.length).toBe(0);
 });

 it('has a submitContact function in the methods', () => {
  expect(typeof ContactForm.methods.submitContact).toBe('function');
 });

 it('has a submitContact function in the methods', () => {
  expect(typeof ContactForm.methods.postSuccess).toBe('function');
 });

 it('has a submitContact function in the methods', () => {
  expect(typeof ContactForm.methods.postFailure).toBe('function');
 });

 it('has a load function in the methods', () => {
  expect(typeof ContactForm.methods.load).toBe('function');
 });

 it('has a stopLoad function in the methods', () => {
  expect(typeof ContactForm.methods.stopLoad).toBe('function');
 });

 it('has a validateForm function in the methods', () => {
  expect(typeof ContactForm.methods.validateForm).toBe('function');
 });

 it('should hide the form and show the loading animation when the load method is triggered.',()=>{
  expect(cmp.vm.loading).toBe(false);
  cmp.vm.load();
  expect(cmp.vm.loading).toBe(true);
  cmp.update();
  expect(cmp.findAll('.animated-loader').length).toBe(1);
  expect(cmp.findAll('form').length).toBe(0);
 });

 it('should show the form and hide the loading animation when the stopLoad method is triggered.',()=>{
  cmp.vm.stopLoad();
  expect(cmp.vm.loading).toBe(false);
  cmp.update();
  expect(cmp.findAll('.animated-loader').length).toBe(0);
  expect(cmp.findAll('form').length).toBe(1);
 });

 it('should show validation error when the form is not valid. All fields must have a value.', ()=>{
   cmp.vm.detail.first_name = "";
   cmp.vm.detail.last_name = "";
   cmp.vm.detail.birthday = "";
   cmp.vm.validateForm();
   cmp.update();

   expect(cmp.findAll('form').length).toBe(1);
   expect(cmp.vm.errors.length).toBe(1);
   expect(cmp.findAll('.error').length).toBe(1);
   //there should be a single error saying "You must not leave any fields blank."
 });

 it('should not validate with incorrect date format',()=>{
  cmp.vm.detail.first_name = "spencer";
  cmp.vm.detail.last_name = "hello";
  cmp.vm.detail.birthday = "12,2,3";
  let valid = cmp.vm.validateForm();
  expect(valid).toBe(false)

 });

 it('should not validate with a month that does not exist',()=>{
  cmp.vm.detail.first_name = "spencer";
  cmp.vm.detail.last_name = "hello";
  cmp.vm.detail.birthday = "2010-231-23";
  //231 is not a real month
  let valid = cmp.vm.validateForm();
  expect(valid).toBe(false)

 });
 it('should not validate with a day that does not exist',()=>{
  cmp.vm.detail.first_name = "spencer";
  cmp.vm.detail.last_name = "hello";
  cmp.vm.detail.birthday = "2010-01-231";
  //231 is not a real day
  let valid = cmp.vm.validateForm();
  expect(valid).toBe(false);
 });
 it('should not validate with the wrong amount of numbers',()=>{
  cmp.vm.detail.first_name = "spencer";
  cmp.vm.detail.last_name = "hello";
  cmp.vm.detail.birthday = "10-01-23";
  //should be 2010 not just 10
  let valid = cmp.vm.validateForm();
  expect(valid).toBe(false);
 });

 it('should validate with correct date format',()=>{
  cmp.vm.detail.first_name = "spencer";
  cmp.vm.detail.last_name = "hello";
  cmp.vm.detail.birthday = "2010-01-23";
  let valid = cmp.vm.validateForm();
  expect(valid).toBe(true)
 });

 it('should trigger submitContact on form submit.', ()=>{
  const spy = spyOn(cmp.vm, 'submitContact');
  cmp.update();
  const theForm = cmp.find('form');
  theForm.trigger('submit');
  expect(cmp.vm.submitContact).toBeCalled();

 });

 it('should increase contacts in the state by 1 on postSuccess()',()=>{
  //after a successful creation of a contact it will insert the contact in the the
  // vuex store contacts array: store.state.contacts will increase by 1.
  let mockSuccessResponse = {
   data:{
    "first_name": "cooley",
    "last_name": "spencer",
    "birthday": "2012-08-23",
    "contact_infos": [],
    "addresses": [],
    "id": 87
   },
   status: 200
  };
  let inital = store.state.contacts.length;
  expect(store.state.contacts.length).toBe(33);
  cmp.vm.postSuccess(mockSuccessResponse);
  expect(store.state.contacts.length).toBe(34);
  expect(store.state.contacts[33].id).toBe(mockSuccessResponse.data.id);
  store.state.contacts.splice(33,1);//this is weird. it is not reseting so I am just splicing it so it doesn't ruin the other tests.
 });

 it('should show an error message on postFailure()',()=>{
  cmp.vm.postFailure({});
  cmp.update();
  expect(cmp.vm.errors.length).toBe(1);
  expect(cmp.findAll('.error').length).toBe(1);
 });

 //up to this point everything is tested only for a create

 //following tests are for delete
 it('has a button for delete and include name in the warning message.', ()=>{
  cmp.setProps({
   options: {
    'type':'contact',
     'action':'delete',
     'detail':{
      'first_name':'hello',
      'last_name':'another',
      'birthday':'2012-02-22',
      'id':1
     }
   }
  });
  expect(cmp.findAll('.btn-danger').length).toBe(1);
  expect(cmp.find('label').text()).toBe('Are You Sure You Want To Delete '+cmp.vm.detail.first_name+' '+cmp.vm.detail.last_name+' From Your Contacts?');
 });

 it('has a deleteSuccess function in the methods that returns the user to homescreen.', () => {
  //should simply delete the user with the staged id from the store contacts.
  expect(typeof ContactForm.methods.deleteSuccess).toBe('function');
  expect(store.state.contacts.length).toBe(33);
  cmp.vm.deleteSuccess(19);
  expect(store.state.detailStaged).toBe(false);
  expect(store.state.kitchenSink).toBe(false);
  expect(store.state.contacts.length).toBe(32);
 });


 it('has a deleteFailure function in the methods', () => {
  cmp.setProps({
   options: {
    'type':'contact',
     'action':'delete',
     'detail':{
      'first_name':'hello',
      'last_name':'another',
      'birthday':'2012-02-22',
      'id':1
     }
   }
  });

  expect(cmp.findAll('.btn-danger').length).toBe(1);
  expect(typeof ContactForm.methods.deleteFailure).toBe('function');
  cmp.vm.deleteFailure();
  expect(cmp.vm.errors.length).toBe(1);
  cmp.update();
  //still show the button.
  expect(cmp.findAll('.error').length).toBe(1);
  expect(cmp.findAll('.btn-danger').length).toBe(1);
 });

 it('should trigger submitContact on delete button submit',()=>{
  cmp.setProps({
   options: {
    'type':'contact',
     'action':'delete',
     'detail':{
      'first_name':'hello',
      'last_name':'another',
      'birthday':'2012-02-22',
      'id':1
     }
   }
  });

  const spy = spyOn(cmp.vm, 'submitContact');
  cmp.update();
  const theButton = cmp.find('.btn-danger');
  theButton.trigger('click');
  expect(cmp.vm.submitContact).toBeCalled();
 });

 it('has a handleCorrectMethod function in the methods', () => {
  expect(typeof ContactForm.methods.handleCorrectMethod).toBe('function');
 });

 it('has a putSuccess function in the methods. should deactivate kitchensink,update contacts data, and reload the detail stage.', () => {
  expect(typeof ContactForm.methods.putSuccess).toBe('function');
  let updatedMockResponse ={
   data:{
    'first_name':'Not Spencer',
    'last_name':'Cooley',
    'birthday':'1987-04-19',
    'contact_infos':[
      {'value':'test@email.com','medium':'email'},
      {'value':'2107893578','medium':'phone'},
      {'value':'test@email.com','medium':'email'}
     ],
     'addresses':[
      {'address_line1':'1915 2nd Avenue','address_line2':'#304','postal_code':'98101','city':'Seattle','state_province':'WA','country':'United States','contact':1}
     ],
     'id':1
   },
   status:200
  };

  expect(store.state.contacts.length).toBe(33);
  let filteredByID = store.state.contacts.filter(contact => contact.id == 1);//looks up id 1 again.
  expect(filteredByID[0].first_name).toBe("Spencer");//should have Spencer set initially
  cmp.vm.putSuccess(updatedMockResponse);
  //count should be the same.
  let filteredByIDAgain = store.state.contacts.filter(contact => contact.id == 1);//looks up id 1 again.
  expect(filteredByIDAgain[0].first_name).toBe("Not Spencer");//should have mutated first_name after putSuccess
  expect(store.state.contacts.length).toBe(33);//should not have changed the count.
  expect(store.state.kitchenSink).toBe(false);
  expect(store.state.detailStaged.first_name).toBe('Not Spencer');
  //check for dom change in the detail stage.
 });

 it('has a putFailure function in the methods', () => {
  expect(typeof ContactForm.methods.putFailure).toBe('function');
  cmp.vm.putFailure();
  expect(cmp.vm.errors.length).toBe(1);

  //what should happen on fail.
  //just show a message saying something went wrong.
 });

});
