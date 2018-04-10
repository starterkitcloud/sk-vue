import ContentApi from '../src/api.js'
const contentApi = new ContentApi();


describe('Api wrapper', ()=>{
  it('should set the client id from the process environment variable', ()=>{
    expect(contentApi.clientID).toBe(process.env.API_CLIENT_ID);
  });
  it('should set the uri from the process environment variable', ()=>{
    expect(contentApi.uri).toBe(process.env.API_URI);
  });

  it('should return data', ()=>{
   let theData = {
    username:'spencercooley',
    password:'pearberry',
    grant_type: 'password'
   }
   contentApi.authToken(theData)

  });

});
