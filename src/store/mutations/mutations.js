import authMutations from './auth.js'
import accountMutations from './account.js'
import layoutMutations from './layout.js'

const mutationsSet = [
	authMutations,
	accountMutations,
	layoutMutations,
]

let mutations = Object.assign(...mutationsSet);

module.exports = mutations;
