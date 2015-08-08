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
      var profileObj = {
        doNotOverride: options[serviceName] // Field shared among services
      };
      profileObj[serviceName + "_specific"] = options[serviceName];
      var userObj = {
        profile: profileObj,
        services: servicesObj,
        doNotOverrideTop: options[serviceName] // Field shared among services
      };
      userObj[serviceName + "_specific_top"] = options[serviceName];
      var newUserId = Accounts.insertUserDoc(options, userObj);
      return {
          userId: newUserId
      };
  });
}
