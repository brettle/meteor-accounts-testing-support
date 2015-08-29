"use strict";
/* globals AccountsTestingSupport: true */

// Disable automatic anonymous users by default
var pkg = Package['brettle:accounts-anonymous-auto'];
if (pkg) {
  pkg.AccountsAnonymousAuto._enabled.set(false);
}

pkg = Package['useraccounts:core'];
if (pkg) {
  pkg.AccountsTemplates.configure({
    forbidClientAccountCreation: false
  });
}

function AccountsTestingSupportConstructor() {}

_.extend(AccountsTestingSupportConstructor.prototype, {
  login: function (serviceName, username, docDefaults, callback) {
    var serviceOptions = {
      docDefaults: docDefaults
    };
    serviceOptions[serviceName] = username;
    Accounts.callLoginMethod({
      methodArguments: [serviceOptions],
      userCallback: callback
    });
  }
});

AccountsTestingSupport = new AccountsTestingSupportConstructor();
