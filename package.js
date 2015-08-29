"use strict";

Package.describe({
  name: 'brettle:accounts-testing-support',
  version: '0.4.0',
  summary: 'Common code shared by tests in brettle:accounts-* packages.',
  git: 'https://github.com/brettle/meteor-testing-support.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.4');
  api.use('accounts-base');
  api.use('underscore');
  api.use('brettle:accounts-anonymous-auto@0.1.0', 'client', { weak: true });
  api.use('useraccounts:core@1.12.0', 'client', { weak: true });
  api.addFiles('accounts-testing-support-server.js', 'server');
  api.addFiles('accounts-testing-support-client.js', 'client');
  api.addFiles('accounts-testing-support.js');
  // NOTE: This package is debugOnly, so you must use:
  // Package["brettle:accounts-testing-support"].AccountsTestingSupport
  // to access the following export.
  api.export('AccountsTestingSupport');
});

Package.onTest(function(api) {
  api.versionsFrom('1.0.4');
  api.use('tinytest');
  api.use('brettle:accounts-anonymous-auto@0.1.0');
  api.use('brettle:accounts-testing-support');
  api.use('accounts-base');
  api.addFiles('accounts-testing-support-server-tests.js', 'server');
  api.addFiles('accounts-testing-support-client-tests.js', 'client');
});
