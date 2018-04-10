import store from '../src/store/store.js';

describe('store', () => {
	const testContacts =
 [{'first_name':'Steve','last_name':'Apple','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':19},{'first_name':'ethereum','last_name':'blockchain','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':38},{'first_name':'Vitalik','last_name':'Buterin','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':13},{'first_name':'Spencer','last_name':'Cooley','birthday':'1987-04-19','contact_infos':[{'value':'test@email.com','medium':'email'},{'value':'2107893578','medium':'phone'},{'value':'test@email.com','medium':'email'}],'addresses':[{'address_line1':'1915 2nd Avenue','address_line2':'#304','postal_code':'98101','city':'Seattle','state_province':'WA','country':'United States','contact':1}],'id':1},{'first_name':'ethereum','last_name':'crypto','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':40},{'first_name':'Another','last_name':'Dogg','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':24},{'first_name':'Snoop','last_name':'Dogg','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':23},{'first_name':'more','last_name':'dogggs','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':25},{'first_name':'Donald','last_name':'Duck','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':17},{'first_name':'tyler','last_name':'durden','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':30},{'first_name':'Monster','last_name':'Elephant','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':21},{'first_name':'Pepe','last_name':'Frog','birthday':'2017-12-03','contact_infos':[],'addresses':[],'id':5},{'first_name':'dogg','last_name':'guy','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':31},{'first_name':'baby','last_name':'mack','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':42},{'first_name':'Zombie','last_name':'Monster','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':18},{'first_name':'Satoshi','last_name':'Nakamoto','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':20},{'first_name':'Mackenzie','last_name':'Olsen','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':41},{'first_name':'Joe','last_name':'Rogan','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':16},{'first_name':'Howard','last_name':'Stern','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':15},{'first_name':'Monster','last_name':'Stern','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':27},{'first_name':'Tyler','last_name':'Steven','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':29},{'first_name':'ethereum','last_name':'token','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':39},{'first_name':'Donald','last_name':'Truck','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':26},{'first_name':'President','last_name':'Trump','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':35},{'first_name':'Ivanka','last_name':'Trump','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':22},{'first_name':'Melania','last_name':'Trump','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':37},{'first_name':'Donald','last_name':'Trump','birthday':'2017-12-03','contact_infos':[],'addresses':[],'id':12},{'first_name':'Steven','last_name':'Tyler','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':28},{'first_name':'Lil','last_name':'Wayne','birthday':'2017-12-03','contact_infos':[],'addresses':[],'id':9},{'first_name':'todd','last_name':'wilson','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':34},{'first_name':'Gary','last_name':'Wilson','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':32},{'first_name':'Fred','last_name':'Wilson','birthday':'2017-12-05','contact_infos':[],'addresses':[],'id':33},{'first_name':'Alien','last_name':'Zombie','birthday':'2017-12-04','contact_infos':[],'addresses':[],'id':14}];

	beforeEach(()=>{
		//needs a copy of the original test object every time so that
		//it does not change the original testContacts value.
		//we only want to test changes to the vuex state.
		let copiedObj = JSON.parse(JSON.stringify(testContacts))
		store.commit('SET_CONTACTS_LIST', { contacts: copiedObj });
 });

	it('should set the kitchen sink data with SET_KITCHEN_SINK mutation commit',()=>{
		store.commit('SET_KITCHEN_SINK', {});
		expect(typeof store.state.kitchenSink).toBe('object');
	});

	it('should set the contacts attribute in the state.', () => {

		expect(store.state.contacts.length).toBe(33);
	});

	it('should set 3 search results in the state for search term "Tyler"', () => {
		//tests mutation SET_SEATCH_RESULTS
		store.commit('SET_SEARCH_RESULTS', 'Tyler');
		expect(store.state.searchResults.length).toBe(3);
	});

	it('should set 3 search results in the state for search term "Tyler"', () => {
		//tests mutation SET_SEATCH_RESULTS
		store.commit('SET_SEARCH_RESULTS', '');
		expect(store.state.searchResults.length).toBe(0);
	});

	it('should set the contact detail stage with data given an id.', () => {
		store.commit('SET_DETAIL_STAGE', 1);
		expect(store.state.detailStaged.first_name).toBe('Spencer');
		expect(store.state.detailStaged.last_name).toBe('Cooley');
	});

	it('should set the contact detail stage to null when passed null', () => {
		store.commit('SET_DETAIL_STAGE', false);
		expect(store.state.detailStaged).toBe(false);
	});


	it('should set authentication state to true when token is present', () => {
		store.commit('TOGGLE_AUTH_STATE', "sometokenvalueasstring");
		expect(store.state.authenticated).toBe(true);
	});

	it('should set authentication state to false when token is missing', () => {
		store.commit('TOGGLE_AUTH_STATE', false);
		expect(store.state.authenticated).toBe(false);
	});

	it('should toggle the global loading state', ()=>{
		expect(store.state.loading).toBe(true);
		store.commit('TOGGLE_LOADING');
		expect(store.state.loading).toBe(false);
	});


	//
	it('should remove an item from the contact list by id', ()=>{
		expect(store.state.contacts.length).toBe(33);
		expect(testContacts.length).toBe(33);

		let filteredByID = store.state.contacts.filter(contact => contact.id == 1);
		expect(testContacts.length).toBe(33);

	 //
		expect(filteredByID.length).toBe(1);
		expect(testContacts.length).toBe(33);

		expect(filteredByID[0].first_name).toBe("Spencer");
		expect(testContacts.length).toBe(33);

		store.commit('DELETE_CONTACT', 1)//should remove item with id 1
		expect(store.state.contacts.length).toBe(32);
		let filteredAgain = store.state.contacts.filter(contact => contact.id == 1);
		expect(filteredAgain.length).toBe(0);//there are no more items in the contacts with an id of 0.
	});

	it('REPLACE_CONTACT should replace an item from the contacts given an id and an object', ()=>{
		expect(store.state.contacts.length).toBe(33);


		//look up using the store. initial should be 1 with a first_name of Spencer.
		let filteredByID = store.state.contacts.filter(contact => contact.id == 1);
		expect(filteredByID[0].first_name).toBe("Spencer");

		let contactId1UpdatedVersion ={
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
		};
		//now replace the contact in the store with the mutated contact above. contactId1UpdatedVersion
		store.commit('REPLACE_CONTACT', contactId1UpdatedVersion);
		let filteredByIDAgain = store.state.contacts.filter(contact => contact.id == 1);//looks up id 1 again.
		expect(filteredByIDAgain.length).toBe(1);
		expect(filteredByIDAgain[0].first_name).toBe("Not Spencer");//confirms mutation has taken place.
	});


});
