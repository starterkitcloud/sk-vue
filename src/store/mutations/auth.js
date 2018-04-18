let authMutations = {
 TOGGLE_AUTH_STATE:(state, token)=>{
		if(token == false){
			state.authenticated = false;
		}
		else{
			state.authenticated = true;
		}
	},
}

module.exports = authMutations;
