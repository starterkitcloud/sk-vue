class ContentApi{
	constructor(){
		this.uri = process.env.API_URI;
		this.clientID = process.env.API_CLIENT_ID;
		this.appName = 'vue-contacts';
		this.config = 	{ headers: {'Authorization': 'Bearer '+localStorage.getItem('authToken')} };
	}

	get root(){
			return this.uri;
	}

	get userSummary(){
		//given the auth token will return data on user who owns that auth token.
		return this.uri+'v1/user_summary/'
	}

	get contacts() {
		return this.uri+'v1/contacts/';
	}
	get contactInfos(){
		return this.uri+'v1/contact-infos/'
	}

	get addresses(){
		return this.uri+'v1/addresses/'
	}

	get authToken(){
		return this.uri+'v1/token/'
	}

	get users(){
		return this.uri+'v1/users/'
	}

	get confirmAccount(){
		return this.uri+'v1/confirm_account/'
	}

	get requestResetPassword(){
		return this.uri+'v1/request-password-reset/'
	}

	get verifyResetToken(){
		return this.uri+'v1/verify-token/'
	}

	get resetPassword(){
		return this.uri+'v1/password-reset/'
	}

}

module.exports = ContentApi;
