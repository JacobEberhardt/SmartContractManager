import { Template } from 'meteor/templating';

import './body.html';

import './accounts/accounts.js';
import './contracts/contract.js';

Template.body.onCreated(function(){
EthBlocks.init();
});

Template.body.helpers({
	currentBlock(){
		return EthBlocks.latest.number;
	}
});