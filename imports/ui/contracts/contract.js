import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import './contract.html';
import '../../api/contracts/contracts.js';

Template.contract.onCreated(function () {
    this.templateDictionary = new ReactiveDict();
});

Template.contract.helpers({
    compiled () {
        return Template.instance().templateDictionary.get('contract') !== undefined;
    },
    name () {
        // get compiled contract
        var contractCompiled = Template.instance().templateDictionary.get('contract')
        // return name
        return Object.keys(contractCompiled);
    },
    abi () {
        // get compiled contract
        var contractCompiled = Template.instance().templateDictionary.get('contract')
        console.log(contractCompiled)
        // return ABI Definition
        var name = Object.keys(contractCompiled);
        return contractCompiled[name].info.abiDefinition;
    }

});


Template.contract.events({
    'submit'(event, instance) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const code = target.text.value;

        // Compile code
        var contractCompiled = Contracts.compile(code);
        instance.templateDictionary.set('contract', contractCompiled);

        // Clear form
        target.text.value = '';

    },
});

