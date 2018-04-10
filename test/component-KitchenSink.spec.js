import Vue from 'vue'
import axios from 'axios';
import KitchenSink from '../src/components/forms/KitchenSink.vue';
import ContentApi from '../src/api.js'
import { shallow } from 'vue-test-utils'
import store from '../src/store/store.js'
const contentApi = new ContentApi();

describe('KitchenSink component', () => {
 let cmp
 //sets up the component for testing.
 beforeEach(()=>{
  cmp = shallow(KitchenSink,{});
 });


 it('should have a computed property called kitchenSink that returns false by default', ()=>{
  expect(cmp.vm.kitchenSink).toBe(false);
 });

 it('should change the value of the kitchenSink computed property on a vuex state change to kitchenSink.', ()=>{
  let sampleData = {
   type:"contact",
  };
  store.commit('SET_KITCHEN_SINK', sampleData);
  expect(cmp.vm.kitchenSink).toBe(sampleData);
 });

});
