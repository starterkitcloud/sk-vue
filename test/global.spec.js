describe('Global environment configuration.', () => {
 //always runs as environment set to test..... since this is a test. 
 it('should have NODE_ENV set to test', ()=>{
   expect(process.env.NODE_ENV).toBe("test")
   expect(process.env.API_URI).toBe("http://localhost:8000/")
 });

 it('should have API_URL set to http://localhost:8000/', ()=>{
   expect(process.env.API_URI).toBe("http://localhost:8000/")
 });

 it('should set the api client id to the environment variable passed in environment',()=>{
  //hard coded in the package.json file for the test environment
  expect(process.env.API_CLIENT_ID).toBe('ie5jdlg4MjCrHSHVYtHjNN8chkMvPRoNxIxFEoAr')
 });



});
