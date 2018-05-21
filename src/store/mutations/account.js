let accountMutations = {
	SET_ACCOUNT_DETAILS:(state, data)=>{
		state.accountDetails = data;
	},
};

module.exports = accountMutations;
