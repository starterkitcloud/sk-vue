class GA {
	constructor(gtag) {
		this.gtag = gtag;
	}

	accountCreated(){
		this.gtag('event', 'account_created',{});
	}

	initialAUM(aum, exchange){
		this.gtag('event', 'linked_account',{
			'event_label':exchange+'_link',
			'value':aum
		});
	}
}

let GAEvents;

if(window.gtag == undefined){
 let gaStub = (event,action, options)=>{
  return true;
 }
 GAEvents = new GA(gaStub);
}
else{
 GAEvents = new GA(window.gtag);
}

module.exports = GAEvents;
