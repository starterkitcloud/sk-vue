import ContentApi from '../src/api.js'



describe('Api wrapper', ()=>{
  const contentApi = new ContentApi();
  beforeEach(()=>{

  });

  it('should set the client id from the process environment variable', ()=>{
    expect(contentApi.clientID).toBe(process.env.API_CLIENT_ID);
  });
  it('should set the uri from the process environment variable', ()=>{
    expect(contentApi.uri).toBe(process.env.API_URI);
  });

  it('should return url at all api endpoints', ()=>{
   expect(contentApi.authToken).toBe(`${process.env.API_URI}o/token/`);

  });

});
