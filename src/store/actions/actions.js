import Vuex from 'vuex';
import axios from 'axios';
import ContentApi from '../../api.js';
import authActions from './auth.js';
import accountActions from './account.js';
import layoutActions from './layout.js'

const actionsSet = [
	authActions,
	accountActions,
	layoutActions,
];

let actions = Object.assign(...actionsSet);

module.exports = actions;
