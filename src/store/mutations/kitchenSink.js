let kitchenSinkMutations = {
 SET_KITCHEN_SINK:(state, details) =>{
		state.kitchenSink = details;
	},
	CLEAR_KITCHEN_SINK:(state)=>{
		state.kitchenSink = false;
	},
}

module.exports = kitchenSinkMutations;
