import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';
import authActions from './auth.js';
import contactsActions from './contacts.js';
import searchActions from './search.js';
import accountActions from './account.js';
import stageActions from './stage.js';
import kitchenSinkActions from './kitchenSink.js';
import contactInfosActions from './contactInfos.js';
import addressesActions from './addresses.js'

const actionsSet = [
	authActions,
	contactsActions,
	searchActions,
	accountActions,
	stageActions,
	kitchenSinkActions,
	contactInfosActions,
	addressesActions
];

let actions = Object.assign(...actionsSet);

module.exports = actions;
