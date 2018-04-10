let accountMutations = {
	SET_ACCOUNT_DETAILS:(state, data)=>{
		state.account_details = data;
	},
};

module.exports = accountMutations;
