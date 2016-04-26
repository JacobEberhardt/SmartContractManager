import { Template } from 'meteor/templating';

import './account.html';

Template.account.helpers({
	accountId(){
		return this;
	}
});