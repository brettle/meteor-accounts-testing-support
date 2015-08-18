"use strict";

Tinytest.add(
  'AccountsTestingSupport - logging in as new name creates user',
  function (test) {
    var connection = DDP.connect(Meteor.absoluteUrl());

    Meteor.users.remove({ 'services.test1.name': "testname" });
    var testId = connection.call('login', { test1: "testname" }).id;
    test.isNotUndefined(testId);
    test.isNotNull(testId);

    var user = Meteor.users.findOne(testId);
    test.equal(user.services.test1.name, 'testname');
  }
);

Tinytest.add(
  'AccountsTestingSupport - logging in as new name with docDefaults',
  function (test) {
    var connection = DDP.connect(Meteor.absoluteUrl());

    Meteor.users.remove({ 'services.test1.name': "testname" });
    var testId = connection.call('login', {
      test1: "testname",
      docDefaults: {
        profile: {
          test: 'profile.test value'
        },
        emails: [{
          address: 'emails[0].address value'
        }],
        services: {
          test1: {
            name: 'should not override options.name passed to login'
          }
        }
      }
    }).id;
    test.isNotUndefined(testId);
    test.isNotNull(testId);

    var user = Meteor.users.findOne(testId);
    test.equal(user.services.test1.name, 'testname');
    test.equal(user.profile.test, 'profile.test value');
    test.equal(user.emails[0].address, 'emails[0].address value');
  }
);

Tinytest.add(
  'AccountsTestingSupport - logging in as existing name works',
  function (test) {
    var connection = DDP.connect(Meteor.absoluteUrl());

    // Create an user
    Meteor.users.remove({ 'services.test1.name': "testname" });
    var testId = connection.call('login', { test1: "testname" }).id;

    connection.call('logout');
    var newTestId = connection.call('login', { test1: "testname" }).id;
    test.equal(newTestId, testId, 'test id');
  }
);
