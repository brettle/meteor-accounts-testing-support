// Disable automatic anonymous users by default
if (Package['brettle:accounts-anonymous-auto']) {
  Package['brettle:accounts-anonymous-auto'].AccountsAnonymousAuto._enabled.set(false);
}

if (Package['useraccounts:core']) {
  Package['useraccounts:core'].AccountsTemplates.configure({
    forbidClientAccountCreation: false
  });
}
