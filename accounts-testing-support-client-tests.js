/* globals AccountsTestingSupport: true */
"use strict";

var AccountsTestingSupport =
  Package["brettle:accounts-testing-support"].AccountsTestingSupport;

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

Tinytest.addAsync(
  'AccountsTestingSupport - login as new and existing user',
  function (test, done) {
    Meteor.call('test1RemoveUser', "testname", function (err) {
      test.isUndefined(err, 'error calling removeTest1User');
      logout();
    });
    function logout() {
      Meteor.logout(function (err) {
        test.isUndefined(err, 'logout error');
        loginWithNewTest1User();
      });
    }
    function loginWithNewTest1User() {
      AccountsTestingSupport.login("test1", "testname", {
        profile: {
          testProp: "test prop value"
        }
      }, function (err) {
        test.isUndefined(err, 'login new error');
        test.isNotNull(Meteor.userId(), 'Meteor.userId() null after login');
        test.isNotNull(Meteor.user(), 'Meteor.user() null after login');
        test.equal(Meteor.user().profile.testProp, "test prop value");
        logoutAfterLogin();
      });
    }
    function logoutAfterLogin() {
      Meteor.logout(function (err) {
        test.isUndefined(err, 'logout error after login');
        loginAsExistingTest1User();
      });
    }
    function loginAsExistingTest1User() {
      AccountsTestingSupport.login("test1", "testname", {}, function (err) {
        test.isUndefined(err, 'error logging in with existing user');
        test.isNotNull(Meteor.userId(), 'Meteor.userId() null after login');
        test.isNotNull(Meteor.user(), 'Meteor.user() null after login');
        test.equal(Meteor.user().profile.testProp, "test prop value");
        done();
      });
    }
  }
);
