define(['require'], function(require) {
  var mocks = [];

  function addMock(name, implementation) {
    mocks.push(name);
    requirejs.undef(name);
    define(name, [], function() {
      return implementation;
    });

    return {
      addMock: addMock,
      loadWithMocks: loadWithMocks
    };
  }

  function loadWithMocks(name, callback) {
    mocks.push(name);
    requirejs.undef(name);
    require([name], callback);
  }

  function reset() {
    mocks.forEach(function(name) {
      requirejs.undef(name);
    });
    mocks.length = 0;
  }

  return {
    addMock: addMock,
    loadWithMocks: loadWithMocks,
    reset: reset
  };
});