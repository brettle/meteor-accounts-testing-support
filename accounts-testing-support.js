"use strict";
// useraccounts:core sets this to true, but we need it to be false for some
// tests.
Accounts.config({
  forbidClientAccountCreation: false
});
// Ignore useraccounts:core attempting to set it, because Accounts.config
// throws an error saying it can only be set once.
var origAccountsConfig = Accounts.config;
Accounts.config = function (options) {
  return origAccountsConfig.call(this,
    _.omit(_.clone(options), 'forbidClientAccountCreation')
  );
};
