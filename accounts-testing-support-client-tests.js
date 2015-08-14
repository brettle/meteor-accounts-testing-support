Tinytest.addAsync('AccountsTestingSupport - not automatically logged in anonymously', function (test, done) {
  Meteor.logout(function (err) {
    test.isUndefined(err, 'logout error');
    Tracker.flush();
    Meteor.setTimeout(function () {
      test.isNull(Meteor.userId(), 'Meteor.userId() should be null after logout');
      test.isNull(Meteor.user(), 'Meteor.user() should be null after logout');
      done();
    }, 100);
  });
});
