Package.describe({
  name: 'brettle:accounts-testing-support',
  version: '0.0.1',
  summary: 'Common code shared by tests in brettle:accounts-* packages.',
  git: ' git@github.com:brettle/meteor-testing-support.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('accounts-base', 'server');
  api.addFiles('accounts-testing-support.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('brettle:accounts-testing-support');
  api.use('accounts-base', 'server');
  api.addFiles('accounts-testing-support-tests.js', 'server');
});
