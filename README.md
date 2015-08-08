# accounts-testing-support
============

Common code shared by tests in brettle:accounts-* packages

## Features

- Registers test login handlers for the `test1` and `test2` services.

## Installation

In the package you are testing:

```javascript
Package.onTest(function(api) {
  // ...
  api.use('brettle:accounts-testing-support');
  /// ...
});
```

## Usage

See `accounts-testing-support-tests.js`.
