import ContactSearch from '../src/utils.js';

describe('ContactSearch', () => {
	let contacts = [
		{'first_name':'Spencer', 'last_name':'Cooley'},
		{'first_name':'Donald', 'last_name':'Duck'},
		{'first_name':'Another', 'last_name':'Duck'},
		{'first_name':'Thing', 'last_name':'Duck'},
	];

	let search = new ContactSearch(contacts);

	it('should set contact data in constructor', () => {
		expect(search.contacts[0]).toBe(contacts[0]);
	});
	it('should search by last name', () => {
		expect(search.byTerm('Cooley').length).toBe(1);
	});
	it('should not be case sensitive', () => {
		expect(search.byTerm('cooley').length).toBe(1);
	});
	it('should search by both last name and first name', () => {
		expect(search.byTerm('Spencer').length).toBe(1);
	});
	it('should return multiple results when they exist', () => {
		expect(search.byTerm('Duck').length).toBe(3);
	});
	it('should return multiple results when they exist and not be case sensitive', () => {
		expect(search.byTerm('duck').length).toBe(3);
	});
	it('should not require a full name', () => {
		expect(search.byTerm('Duc').length).toBe(3);
	});

	it('should allow an empty string', () => {
		expect(search.byTerm('').length).toBe(0);
	});

});
