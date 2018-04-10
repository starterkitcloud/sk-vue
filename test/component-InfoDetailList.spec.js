import Vue from 'vue'
import axios from 'axios';
import InfoDetailList from '../src/components/InfoDetailList.vue';
import ContentApi from '../src/api.js'
import { shallow } from 'vue-test-utils'
import store from '../src/store/store.js'
const contentApi = new ContentApi();


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


describe('InfoDetailList for email component', () => {

 beforeEach(()=>{
  //set up some initial contacts in the store.
  let copiedObj = JSON.parse(JSON.stringify(testContacts))
  store.commit('SET_CONTACTS_LIST', { contacts: copiedObj });
  //set up the detailStage in the vuex store
  store.dispatch('LOAD_DETAIL_STAGE', 1);
  cmp = shallow(InfoDetailList,{
   //this is the data that will be passed in from detailStaged in vuex.
   propsData:{
     options: {
      'type':'email',
      'detail':{
       'first_name':'hello',
       'contact_infos':[
        {
         'medium':'email',
         'value':'thing@email.com'
        },
        {
         'medium':'email',
         'value':'thing@email.com'
        },
        {
         'medium':'phone',
         'value':'2107893578'
        },
        {
         'medium':'phone',
         'value':'2107893575'
        }
       ],
       'last_name':'another',
       'birthday':'2012-02-22',
       'addresses':[],
       'id':1
      }
     }
   }

  });
 });

 it('should show the label email in the dom', ()=>{
  expect(cmp.find('.info-detail-title').text()).toBe('Email');
 });

 it('should render 2 envelope icons as well as 2 list items since there are 2 emails in the props.',()=>{
  expect(cmp.findAll('.fa-envelope').length).toBe(2);
  expect(cmp.findAll('li').length).toBe(2);
 });

 it('should trigger openKitchenSink() on click of add-info', ()=>{
  const spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  const theButton = cmp.find('.add-info');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).toBeCalled();
 });


 it('should trigger openKitchenSink() on click of edit-info', ()=>{
  const spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  const theButton = cmp.find('.edit-info');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).toBeCalled();
 });


 it('should set a value to kitchenSink in the vuex store when the openKitchenSink method if triggered',()=>{
  cmp.vm.openKitchenSink({});
  expect(typeof store.state.kitchenSink).toBe('object');
 });

 it('should have a method prettyPhone that returns phone number in format (222)333-2222', ()=>{
  expect(cmp.vm.prettyPhone(2107893578)).toBe('(210) 789-3578');
 });

 it('should not open the kitchensink when the info-action button is clicked', ()=>{
  const spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  const theButton = cmp.find('.info-action');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).not.toBeCalled();
 });


});


describe('InfoDetailList for phone component', () => {

 beforeEach(()=>{
  //set up some initial contacts in the store.
  let copiedObj = JSON.parse(JSON.stringify(testContacts))
  store.commit('SET_CONTACTS_LIST', { contacts: copiedObj });
  //set up the detailStage in the vuex store
  store.dispatch('LOAD_DETAIL_STAGE', 1);
  cmp = shallow(InfoDetailList,{
   //this is the data that will be passed in from detailStaged in vuex.
   propsData:{
     options: {
      'type':'phone',
      'detail':{
       'first_name':'hello',
       'contact_infos':[
        {
         'medium':'email',
         'value':'thing@email.com'
        },
        {
         'medium':'email',
         'value':'thing@email.com'
        },
        {
         'medium':'phone',
         'value':'2107893578'
        },
        {
         'medium':'phone',
         'value':'2107893575'
        }
       ],
       'last_name':'another',
       'birthday':'2012-02-22',
       'addresses':[],
       'id':1
      }
     }
   }

  });
 });
 it('should trigger openKitchenSink() on click of add-info', ()=>{
  const spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  const theButton = cmp.find('.add-info');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).toBeCalled();
 });

 it('should trigger openKitchenSink() on click of edit-info', ()=>{
  const spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  const theButton = cmp.find('.edit-info');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).toBeCalled();
 });

 it('should render 2 phone icons as well as 2 list items since there are 2 phone numbers in the props.',()=>{
  expect(cmp.findAll('.fa-phone').length).toBe(2);
  expect(cmp.findAll('li').length).toBe(2);
 });

 it('should have an openKitchenSink method available.', ()=>{
  expect(typeof InfoDetailList.methods.openKitchenSink).toBe('function');
 });

 it('should trigger the openKitchenSink method when .add-info icon is clicked',()=>{
  let spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  let theButton = cmp.find('.add-info');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).toBeCalled();
 });

 it('should not open the kitchensink when the info-action button is clicked', ()=>{
  const spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  const theButton = cmp.find('.info-action');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).not.toBeCalled();
 });

});

describe('InfoDetailList for address component', () => {

 beforeEach(()=>{
  //set up some initial contacts in the store.
  let copiedObj = JSON.parse(JSON.stringify(testContacts))
  store.commit('SET_CONTACTS_LIST', { contacts: copiedObj });
  //set up the detailStage in the vuex store
  store.dispatch('LOAD_DETAIL_STAGE', 1);
  cmp = shallow(InfoDetailList,{
   //this is the data that will be passed in from detailStaged in vuex.
   propsData:{
     options: {
      'type':'address',
      'detail':{
       'first_name':'hello',
       'contact_infos':[
        {
         'medium':'email',
         'value':'thing@email.com'
        },
        {
         'medium':'email',
         'value':'thing@email.com'
        },
        {
         'medium':'phone',
         'value':'2107893578'
        },
        {
         'medium':'phone',
         'value':'2107893575'
        }
       ],
       'last_name':'another',
       'birthday':'2012-02-22',
       'addresses':[
        {
         address_line1:'200 circle rd',
         address_line2:'#2000',
         city:'Seattle',
         contact:142,
         country:'United States',
         id:1,
         postal_code:'98101',
         state_province:'WA'
        },
        {
         address_line1:'200 circle rd again',
         address_line2:'#203300',
         city:'Seattle',
         contact:142,
         country:'United States',
         id:2,
         postal_code:'98101',
         state_province:'WA'
        },
       ],
       'id':1
      }
     }
   }

  });
 });

 it('should trigger openKitchenSink() on click of add-info', ()=>{
  const spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  const theButton = cmp.find('.add-info');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).toBeCalled();
 });

 it('should trigger openKitchenSink() on click of edit-info', ()=>{
  const spy = spyOn(cmp.vm, 'openKitchenSink');
  cmp.update();
  const theButton = cmp.find('.edit-info');
  theButton.trigger('click');
  expect(cmp.vm.openKitchenSink).toBeCalled();
 });

 it('should show the label email in the dom', ()=>{
  expect(cmp.find('.info-detail-title').text()).toBe('Address');
 });

 it('should render 2 map marker icons as well as 2 list items since there are 2 addresses in the props.',()=>{
  expect(cmp.findAll('.fa-map-marker').length).toBe(2);
  expect(cmp.findAll('li').length).toBe(2);
 })



});




describe('InfoDetailList for email component with no emails.', () => {

 beforeEach(()=>{
  //set up some initial contacts in the store.
  let copiedObj = JSON.parse(JSON.stringify(testContacts))
  store.commit('SET_CONTACTS_LIST', { contacts: copiedObj });
  //set up the detailStage in the vuex store
  store.dispatch('LOAD_DETAIL_STAGE', 1);
  cmp = shallow(InfoDetailList,{
   //this is the data that will be passed in from detailStaged in vuex.
   propsData:{
     options: {
      'type':'email',
      'detail':{
       'first_name':'hello',
       'contact_infos':[],
       'last_name':'another',
       'birthday':'2012-02-22',
       'addresses':[],
       'id':1
      }
     }
   }

  });
 });
 it('should have one list item with a message saying that you have not added any email address yet',()=>{
   expect(cmp.findAll('li').length).toBe(1);

 });



});

describe('InfoDetailList for phone component with no phones.', () => {

 beforeEach(()=>{
  //set up some initial contacts in the store.
  let copiedObj = JSON.parse(JSON.stringify(testContacts))
  store.commit('SET_CONTACTS_LIST', { contacts: copiedObj });
  //set up the detailStage in the vuex store
  store.dispatch('LOAD_DETAIL_STAGE', 1);
  cmp = shallow(InfoDetailList,{
   //this is the data that will be passed in from detailStaged in vuex.
   propsData:{
     options: {
      'type':'phone',
      'detail':{
       'first_name':'hello',
       'contact_infos':[],
       'last_name':'another',
       'birthday':'2012-02-22',
       'addresses':[],
       'id':1
      }
     }
   }

  });
 });
 it('should have one list item with a message saying that you have not added any phone numbers yet',()=>{
   expect(cmp.findAll('li').length).toBe(1);
 });


});


describe('InfoDetailList for address component with no addresses.', () => {

 beforeEach(()=>{
  //set up some initial contacts in the store.
  let copiedObj = JSON.parse(JSON.stringify(testContacts))
  store.commit('SET_CONTACTS_LIST', { contacts: copiedObj });
  //set up the detailStage in the vuex store
  store.dispatch('LOAD_DETAIL_STAGE', 1);
  cmp = shallow(InfoDetailList,{
   //this is the data that will be passed in from detailStaged in vuex.
   propsData:{
     options: {
      'type':'address',
      'detail':{
       'first_name':'hello',
       'contact_infos':[],
       'last_name':'another',
       'birthday':'2012-02-22',
       'addresses':[],
       'id':1
      }
     }
   }
  });
 });

 it('should have one list item with a message saying that you have not added any addresses yet',()=>{
   expect(cmp.findAll('li').length).toBe(1);
 });

});
