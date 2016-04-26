import { Template } from 'meteor/templating';

import './accounts.html';
import './account.js';

import '../../api/accounts/accounts.js';

Template.accounts.helpers({
	accounts(){
		return Accounts.getAccounts();
	},
});