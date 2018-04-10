import Vue from 'vue'
import axios from 'axios';
import ContactDetail from '../src/components/ContactDetail.vue';
import ContentApi from '../src/api.js'
import { shallow } from 'vue-test-utils'
import store from '../src/store/store.js'
const contentApi = new ContentApi();

describe('ContactDetail component', () => {
 //test that the computed property detailStaged works correctly.
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
  store.commit('SET_CONTACTS_LIST', { contacts: testContacts });
  store.dispatch('LOAD_DETAIL_STAGE', 1);
  store.state.kitchenSink = false;
  cmp = shallow(ContactDetail,{});
 });

 it('should set up the test with the correct inital data.',()=>{
  expect(store.state.detailStaged.first_name).toBe(contactId1.first_name)
  expect(store.state.detailStaged.last_name).toBe(contactId1.last_name)
  expect(store.state.detailStaged.birthday).toBe(contactId1.birthday)
 });

 it('should set the name and birthday in the header',()=>{
  //birthday-title class
  //name-title class
  expect(cmp.find('.name-title').text()).toBe('Spencer Cooley')
  expect(cmp.find('.birthday-title').text()).toBe(': '+contactId1.birthday)
 });


 //test the computed property is the same as what is in the store.
 it('has a computed proerty that always returns the state of the detailStaged in vuex store',()=>{
  expect(cmp.vm.detailStaged).toBe(store.state.detailStaged);
  store.state.detailStaged = false;
  cmp.update();
  expect(cmp.vm.detailStaged).toBe(false);
 });


 //delete stuff.
 it('has an initeDelete function in the methods', () => {
  expect(typeof ContactDetail.methods.initDelete).toBe('function');
 });

 it('should set the kitchen sink in the vuexstore to proper object when calling initDelete', ()=>{
  expect(store.state.kitchenSink).toBe(false);
  cmp.vm.initDelete();
  expect(typeof store.state.kitchenSink).toBe('object');
  expect(store.state.kitchenSink.type).toBe('contact');
  expect(store.state.kitchenSink.action).toBe('delete');
 });

 it('should fire the initDelete function on click of the delete button',()=>{
  const spy = spyOn(cmp.vm, 'initDelete');
  cmp.update();
  let deleteButton = cmp.find('.delete-btn');
  deleteButton.trigger('click');
  expect(cmp.vm.initDelete).toBeCalled();
 });



 //edit stuff
 it('should have an edit contact button', ()=>{
  expect(cmp.findAll('.edit-contact').length).toBe(1);
 });

 it('should have an initeEditContact function in the methods', () => {
  expect(typeof ContactDetail.methods.initEditContact).toBe('function');
 });

 it('should set the kitchen sink in the vuexstore to proper object when calling initEditContact', ()=>{
  expect(store.state.kitchenSink).toBe(false);
  cmp.vm.initEditContact();
  expect(typeof store.state.kitchenSink).toBe('object');
  expect(store.state.kitchenSink.type).toBe('contact');
  expect(store.state.kitchenSink.action).toBe('update');
 });

 it('should fire the initEditContact function on click of the edit button',()=>{
  const spy = spyOn(cmp.vm, 'initEditContact');
  cmp.update();
  let editButton = cmp.find('.edit-contact');
  editButton.trigger('click');
  expect(cmp.vm.initEditContact).toBeCalled();
 });







});
