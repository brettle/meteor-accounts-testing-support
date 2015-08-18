# brettle:accounts-testing-support

[![Build Status](https://travis-ci.org/brettle/meteor-accounts-testing-support.svg?branch=master)](https://travis-ci.org/brettle/meteor-accounts-testing-support)

Common code shared by tests in various `brettle:accounts-*` packages

## Features

- Registers test login handlers for the `test1` and `test2` services.
- Disables `brettle:accounts-anonymous-auto` so that it won't interfere with
  other tests. The `brettle:accounts-anonymous-auto` tests re-enable it
  temporarily.
- Explicitly enables client account creation and prevents `useraccounts:core`
  from disabling it again, because it is needed by some tests.

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
