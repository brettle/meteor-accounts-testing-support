if (process.env.NODE_ENV === 'development') {
  ['test1', 'test2'].forEach(createServiceWithName);
} else {
  throw Error('Test login handlers can only be registered on development servers for security reasons.');
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
      var profileObj = {
        doNotOverride: options[serviceName] // Field shared among services
      };
      profileObj[serviceName + "-specific"] = options[serviceName];
      var newUserId = Accounts.insertUserDoc(options, {
        profile: profileObj,
        services: servicesObj
      });
      return {
          userId: newUserId
      };
  });
}
