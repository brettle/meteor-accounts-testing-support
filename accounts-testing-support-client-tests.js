"use strict";

Tinytest.addAsync(
  'AccountsTestingSupport - not automatically logged in anonymously',
  function (test, done) {
    Meteor.logout(function (err) {
      test.isUndefined(err, 'logout error');
      Tracker.flush();
      Meteor.setTimeout(function () {
        test.isNull(Meteor.userId(), 'Meteor.userId() not null after logout');
        test.isNull(Meteor.user(), 'Meteor.user() not null after logout');
        done();
      }, 100);
    });
  }
);
