class ContactSearch{

	constructor(data){
		this.contacts = data;
	}
	byTerm(term){
		if(term.length < 3){
			return [];
		}
		else{
			let searchResults = [];
			for(let i=0;i<this.contacts.length;i++){
				let contact = this.contacts[i];
				let fullName = contact.first_name+' '+contact.last_name;
				if(fullName.toLowerCase().includes(term.toLowerCase())){
					searchResults.push(contact);
				}
			}
			return searchResults;
		}
	}

}

module.exports = ContactSearch;
