"use strict";

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
