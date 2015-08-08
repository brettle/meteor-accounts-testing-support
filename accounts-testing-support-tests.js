Tinytest.add('AccountsTestingSuppoort - logging in as new name creates user', function (test) {
  var connection = DDP.connect(Meteor.absoluteUrl());

  Meteor.users.remove({ 'services.test1.name': "testname" });
  var testId = connection.call('login', { test1: "testname" }).id;
  test.isNotUndefined(testId);
  test.isNotNull(testId);

  var user = Meteor.users.findOne(testId);
  test.equal(user.services.test1.name, 'testname');
});

Tinytest.add('AccountsTestingSuppoort - logging in as existing name works', function (test) {
  var connection = DDP.connect(Meteor.absoluteUrl());

  // Create an user
  Meteor.users.remove({ 'services.test1.name': "testname" });
  var testId = connection.call('login', { test1: "testname" }).id;

  connection.call('logout');
  var newTestId = connection.call('login', { test1: "testname" }).id;
  test.equal(newTestId, testId, 'test id');
});
