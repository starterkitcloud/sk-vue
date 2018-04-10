import InfosForm from '../src/components/forms/InfosForm.vue'
import store from '../src/store/store.js'
import { shallow } from 'vue-test-utils'
let cmp;

//set the kitchen sink
let contactDetail = {
 'first_name':'Spencer',
 'last_name':'Cooley',
 'birthday':'1987-04-19',
 'contact_infos':[
   {'value':'test@email.com','medium':'email', id:1},
   {'value':'2107893578','medium':'phone', id:2},
   {'value':'test@email.com','medium':'email', id:3}
  ],
  'addresses':[
   {'address_line1':'1915 2nd Avenue','address_line2':'#304','postal_code':'98101','city':'Seattle','state_province':'WA','country':'United States','contact':1}
  ],
  'id':1
};



//new email
describe('InfosForm component as email in create mode', ()=>{

 beforeEach(()=>{
  store.state.detailStaged = contactDetail;
  store.state.kitchenSink = {};
  cmp = shallow(InfosForm,{
   propsData:{
    options: {
     type:'email',
     detail:contactDetail,
     id:false,
     value:''
    }
   },
  });
 });

 //ends beforeEach
 it('should test the basic rendering. ',()=>{
  expect(cmp.find('h2').text()).toBe('New Email');
  expect(cmp.vm.value).toBe('');
  expect(cmp.findAll('form').length).toBe(1);
 });

 it('should use load() and stopLoad() to insert remove form and loading animation', ()=>{
  cmp.vm.load();
  cmp.update();
  expect(cmp.vm.loading).toBe(true);
  expect(cmp.findAll('.animated-loader').length).toBe(1);
  cmp.vm.stopLoad();
  cmp.update();
  expect(cmp.vm.loading).toBe(false);
  expect(cmp.findAll('.animated-loader').length).toBe(0);
 });

 // it('should do the proper things when a new record is successfully created.',()=>{
 //  let mockAxiosResponse = {
 //   data:{'value':'test@email.com','medium':'email', id:10},
 //   status:200
 //  }
 //  cmp.vm.postSuccess(mockAxiosResponse);
 //  cmp.update();
 //  expect(store.state.kitchenSink).toBe(false);
 // });


 // it('should do the proper things when a new record fails at being created.',()=>{
 //  cmp.vm.postFailure();
 //  cmp.update();
 //  //kitchen sink should stay open.
 //  expect(typeof store.state.kitchenSink).toBe('object');
 //  //should show an error message
 //  expect(cmp.vm.errors.length).toBe(1);
 //  expect(cmp.findAll('.error').length).toBe(1);
 //  expect(cmp.vm.errors[0]).toBe("Something Went Wrong. Try Again.");
 //  //the form should be present.
 //  expect(cmp.findAll('form').length).toBe(1);
 // });



});





//edit email
describe('InfosForm component as email in edit mode', ()=>{

 beforeEach(()=>{
  store.state.detailStaged = contactDetail;
  store.state.kitchenSink = {};

  cmp = shallow(InfosForm,{
   propsData:{
    options: {
     type:'email',
     detail:contactDetail,
     id:1,
     value:'contact@spencercooley.com'
    }
   },
  });
 });
 //ends beforeEach

 it('should test the basic rendering ',()=>{
  expect(cmp.find('h2').text()).toBe('Edit Email');
  expect(cmp.vm.value).toBe('contact@spencercooley.com');
  expect(cmp.findAll('form').length).toBe(1);
 });

 it('should do the proper things when a new record is successfully updated.',()=>{
  let filteredByID = store.getters.detailStaged.contact_infos.filter(record => record.id == 3);
  expect(filteredByID[0].id).toBe(3);
  expect(filteredByID[0].medium).toBe('email');
  expect(filteredByID[0].value).toBe('test@email.com');

  //needs to find and replace from store.getters.detailStaged.contact_infos

  expect(store.getters.detailStaged.contact_infos.length).toBe(3);

  let mockAxiosResponse = {
   data:{'value':'updatedtest@new.com','medium':'email', id:3},
   status:200
  }

  cmp.vm.putSuccess(mockAxiosResponse);
  cmp.update();
  expect(store.state.kitchenSink).toBe(false);
  expect(store.getters.detailStaged.contact_infos.length).toBe(3);
  let filteredByIDAgain = store.getters.detailStaged.contact_infos.filter(record => record.id == 3);
  expect(filteredByIDAgain[0].id).toBe(3);
  expect(filteredByIDAgain[0].medium).toBe('email');
  expect(filteredByIDAgain[0].value).toBe('updatedtest@new.com');
 });

 it('should do the proper things when a new record fails at being updated.',()=>{
  cmp.vm.putFailure();
  cmp.update();
  //kitchen sink should stay open.
  expect(typeof store.state.kitchenSink).toBe('object');
  //should show an error message
  expect(cmp.vm.errors.length).toBe(1);
  expect(cmp.findAll('.error').length).toBe(1);
  expect(cmp.vm.errors[0]).toBe("Something Went Wrong. Try Again.");
  //the form should be present.
  expect(cmp.findAll('form').length).toBe(1);
 });

 //delete stuff. Only present when in edit mode.
 it('should have a delete button', ()=>{
  expect(cmp.findAll('.del-btn').length).toBe(1);
 });

 it('should do the proper things when there is a successful delete.', ()=>{
  expect(store.getters.detailStaged.contact_infos.length).toBe(3);
  //pass it the id that needs to be deleted.
  cmp.vm.deleteSuccess(3);
  cmp.update();
  expect(store.getters.detailStaged.contact_infos.length).toBe(2);
  //needs to close the kitchen sink
  expect(store.state.kitchenSink).toBe(false);
 });

 it('should do the proper things when there is a failed delete.', ()=>{
  cmp.vm.deleteFailure();
  cmp.update();
  expect(typeof store.state.kitchenSink).toBe('object');
  expect(cmp.vm.errors.length).toBe(1);
  expect(cmp.findAll('.error').length).toBe(1);
  expect(cmp.vm.errors[0]).toBe("Something Went Wrong. Try Again.");
  //the form should be present.
  expect(cmp.findAll('form').length).toBe(1);

  expect('t').toBe('t');
 });


});




















//new phone
describe('InfosForm component as phone in edit mode', ()=>{
 beforeEach(()=>{
  cmp = shallow(InfosForm,{
   propsData:{
    options: {
     type:'phone',
     detail:contactDetail,
     id:false,
     value:''
    }
   },
  });
 });
 //ends beforeEach
 it('should emake a test thing',()=>{
  expect(cmp.find('h2').text()).toBe('New Phone Number');
  expect(cmp.vm.value).toBe('');
  expect(cmp.findAll('form').length).toBe(1);
 });
});



//edit phone
describe('InfosForm component as phone in edit mode', ()=>{
 beforeEach(()=>{
  cmp = shallow(InfosForm,{
   propsData:{
    options: {
     type:'phone',
     detail:contactDetail,
     id:1,
     value:'contact@spencercooley.com'
    }
   },
  });
 });
 //ends beforeEach
 it('render properly in edit mode for phone',()=>{
  expect(cmp.find('h2').text()).toBe('Edit Phone Number');
  expect(cmp.vm.value).toBe('contact@spencercooley.com');
  expect(cmp.findAll('form').length).toBe(1);
 });
});
