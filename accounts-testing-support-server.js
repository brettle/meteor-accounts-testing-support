/* globals AccountsTestingSupport: true */
"use strict";

['test1', 'test2'].forEach(createServiceWithName);

if (Accounts.removeDefaultRateLimit) {
  Accounts.removeDefaultRateLimit();
}

function createServiceWithName(serviceName) {
  Accounts.registerLoginHandler(serviceName, function (options) {
      if (! options || ! options[serviceName]) {
        return undefined;
      }
      var selector = {};
      selector['services.' + serviceName + '.name'] = options[serviceName];
      var user = Meteor.users.findOne(selector);
      if (user) {
        return { userId: user._id };
      }
      var servicesObj = {};
      servicesObj[serviceName] = { name: options[serviceName] };
      var userObj = { services: servicesObj };
      if (options.docDefaults) {
        _.defaults(userObj, options.docDefaults);
        if (options.docDefaults.services) {
          _.defaults(userObj.services, options.docDefaults.services);          
        }
      }
      var newUserId = Accounts.insertUserDoc(options, userObj);
      return {
          userId: newUserId
      };
  });

  // Add a <serviceName>RemoveUser method
  var methodsObj = {};
  methodsObj[serviceName + "RemoveUser"] = function (username) {
    var selector = {};
    selector['services.' + serviceName + '.name'] = username;
    Meteor.users.remove(selector);
  };
  Meteor.methods(methodsObj);
}

function AccountsTestingSupportConstructor() {}

_.extend(AccountsTestingSupportConstructor.prototype, {
});

AccountsTestingSupport = new AccountsTestingSupportConstructor();
