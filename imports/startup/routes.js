import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../ui/layouts/applicationLayout.js';
import '../ui/contracts/contract.js';
import '../ui/accounts/accounts.js';
import '../ui/pages/app-not-found.js';


FlowRouter.route('/', {
    name: 'root',
    action() {
        FlowRouter.redirect('/contracts');
    },
});

FlowRouter.route('/contracts', {
    action: function () {
        console.log('contracts route triggered');
        BlazeLayout.render( 'applicationLayout', {
            sidebar: 'sidebarTemplate',
            main: 'contract',
        });
    },
    name: 'contracts',
});

FlowRouter.route('/accounts', {
    action: function () {
        console.log('accounts route triggered');
        BlazeLayout.render( 'applicationLayout', {
            sidebar: 'sidebarTemplate',
            main: 'accounts',
        });
    },
    name: 'contracts',
});


// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('applicationLayout', {main: 'appNotFound'});
    },
};

