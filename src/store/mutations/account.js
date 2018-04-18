let accountMutations = {
	SET_ACCOUNT_DETAILS:(state, data)=>{
		state.accountDetails = data;
	},
	TOGGLE_LOADING: (state)=>{
		state.loading = !state.loading;
	},
};

module.exports = accountMutations;
