let kitchenSinkActions = {
 //might get rid of this in place of a kitchen sink design.
	LOAD_KITCHEN_SINK: ({commit}, detail) =>{
		commit('SET_KITCHEN_SINK', detail);
	},
	CLEAR_KITCHEN_SINK: ({commit}) =>{
		commit('CLEAR_KITCHEN_SINK');
	},

}

module.exports = kitchenSinkActions;
