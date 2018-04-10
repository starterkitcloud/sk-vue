import _ from 'lodash';

let stageMutations = {

	SET_DETAIL_STAGE: (state, contactId) =>{
		if(contactId == false){
			state.detailStaged = false;
		}
		else{
			let filteredByID = state.contacts.filter(contact => contact.id == contactId);
			if(filteredByID.length < 1){
				throw 'id can not be found in contacts';
			}
			else{
				let emails = _.map(filteredByID[0].contact_infos, function(ci) {
					if (ci.medium == 'email') return ci;
				});
    let phones = _.map(filteredByID[0].contact_infos, function(ci) {
					if (ci.medium == 'phone') return ci;
				});
				state.detailStaged = filteredByID[0];
				state.detailStaged.emails = _.without(emails, undefined);
    state.detailStaged.phones = _.without(phones, undefined);
			}
		}
	}

};

module.exports = stageMutations;
