['test1', 'test2'].forEach(createServiceWithName);

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
      }
      var newUserId = Accounts.insertUserDoc(options, userObj);
      return {
          userId: newUserId
      };
  });
}
