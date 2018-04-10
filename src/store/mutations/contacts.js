let contactsMutations = {
 SET_CONTACTS_LIST: (state, { contacts }) => {
		state.contacts = contacts;
	},
}

module.exports = contactsMutations;
