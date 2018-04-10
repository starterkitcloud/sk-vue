import ContactSearch from '../../utils.js';

let searchMutations = {
	SET_SEARCH_RESULTS: (state,searchTerm) =>{
		let search = new ContactSearch(state.contacts);
		let results = search.byTerm(searchTerm);
		state.searchResults = results;
	},
	CLEAR_SEARCH: (state)=>{
		state.searchResults = [];
	},
};

module.exports = searchMutations;
