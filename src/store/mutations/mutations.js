import ContactSearch from '../../utils.js'
import authMutations from './auth.js'
import contactsMutations from './contacts.js'
import searchMutations from './search.js'
import accountMutations from './account.js'
import stageMutations from './stage.js'
import kitchenSinkMutations from './kitchenSink.js'

//check there are tests for all of these.
const tempMutationsMain = {
	SET_INFOS: (state, record) =>{
		state.detailStaged.contact_infos.push(record);
	},
	SET_REPLACE_CONTACT_INFOS_STAGE: (state, record) =>{
		let filteredByID = state.detailStaged.contact_infos.filter(infos => infos.id == record.id);
		//contact should be the mutated contact.
		//what it needs to do is lookup the
		if(filteredByID.length < 1){
			throw 'id can not be found in contacts';
		}
		else{
			state.detailStaged.contact_infos.splice(state.detailStaged.contact_infos.indexOf(filteredByID[0]),1, record);
			// replaces old contact with new contact.
		}
		//this needst to find the record and replace it.
	},

	REPLACE_CONTACT: (state, contactItem)=>{
		let filteredByID = state.contacts.filter(contact => contact.id == contactItem.id);
		//contact should be the mutated contact.
		//what it needs to do is lookup the
		if(filteredByID.length < 1){
			throw 'id can not be found in contacts';
		}
		else{
			state.contacts.splice(state.contacts.indexOf(filteredByID[0]),1, contactItem);
			// replaces old contact with new contact.
		}
	},

	DELETE_CONTACT_INFOS:(state, id)=>{
		let filteredByID = state.detailStaged.contact_infos.filter(record => record.id == id);
		if(filteredByID.length < 1){
			throw 'id can not be found in contacts';
		}
		else{
			state.detailStaged.contact_infos.splice( state.detailStaged.contact_infos.indexOf(filteredByID[0]),1);
		}
	},

	ADD_CONTACT:(state, contact)=>{
		//just insert the thing.
		state.contacts.push(contact);
	},

	TOGGLE_LOADING: (state)=>{
		state.loading = !state.loading;
	},
};


const mutationsSet = [
	tempMutationsMain,
	authMutations,
	contactsMutations,
	searchMutations,
	accountMutations,
	stageMutations,
	kitchenSinkMutations
]

let mutations = Object.assign(...mutationsSet);

module.exports = mutations;
