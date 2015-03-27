# Mock module for requirejs projects
Allow insert your own dependencie to tested file

## How to use example
Foo.js
```javascript
define(['TextFactory', 'Localization'], function (TextFactory, Localization) {
  return {
    action: function  () {
      return Localization(TextFactory.getSimpleText());
    }
  }
});
```


Foo.test.js
```javascript
define(['mocker'], function (mocker) {
  describe('test cases', function () {
    
    var moduleToTest;
    
    beforeEach(function (done) {
      mocker
        .addMock('TextFactory', {
          getSimpleText: function(){
            return 'Hello';
          }
        })
        .addMock('Localization', function(str){
          return str;
        })
        .loadWithMocks('Foo', function (Foo) {
          moduleToTest = Foo;
          done();
        });
    });

    it('case', function () {
      expect(moduleToTest.action()).toEqual('Hello');
    });

    afterEach(function () {
      mocker.reset();
    });
  });
});
```
