const getters = {
	kitchenSink: state =>{
		return state.kitchenSink;
	},
	loading: state =>{
		return state.loading;
	},
	authenticated: state =>{
		return state.authenticated;
	},
	contacts: state => {
		return state.contacts;
	},

	searchResults: state =>{
		return state.searchResults;
	},
	detailView: state =>{
		return state.detailView;
	},
	detailStaged: state =>{
		return state.detailStaged;
	},
	accountDetails: state =>{
		return state.accountDetails;
	},
};

module.exports = getters;
