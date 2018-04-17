import ContactSearch from '../../utils.js'
import authMutations from './auth.js'
import accountMutations from './account.js'

const mutationsSet = [
	authMutations,
	accountMutations,
]

let mutations = Object.assign(...mutationsSet);

module.exports = mutations;
