import GAEvents from '../lib/gaEvents.js'


describe('GAEvents module', () => {

 it('should not have gtag set in window', ()=>{
   expect(window.gtag).toBeUndefined()
 });

 it('should not be defined because window.gtag is not set.',()=>{
  expect(GAEvents).toBeDefined();
  expect(typeof GAEvents.gtag).toBe('function');
 });

 it('should execute the funtcions in the GAEvents without actually doing anythin except returning true.',()=>{
  expect(GAEvents.gtag('event', 'account_created',{})).toBe(true);
 });

});
