import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './contract.html';
import '../../api/contracts/contracts.js';

Template.contract.onCreated(function () {
    this.templateVar = new ReactiveVar();
});

Template.contract.helpers({
    compiled () {
        return Template.instance().templateVar.get() !== undefined;
    },
    contracts() {
        // get compiled contracts
        var contractCompiled = Template.instance().templateVar.get()
        // put them into array and add name as property
        var contractArray = [];
        for(key in contractCompiled){
            contractArray.push({name: key, value: contractCompiled[key]});
        }
        // return array of contracts
        console.log('Contracts: ', contractArray)
        return contractArray;
    },
    // abi () {
    //     // get compiled contract
    //     var contractCompiled = Template.instance().templateVar.get()
    //     console.log(contractCompiled)
    //     // return ABI Definition
    //     var name = Object.keys(contractCompiled);
    //     return contractCompiled[name].info.abiDefinition;
    // }

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
        instance.templateVar.set(contractCompiled);

        // Clear form
        target.text.value = '';

    },
});

