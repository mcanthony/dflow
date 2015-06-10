
var should   = require('should'),
    validate = require('../src/validate')

describe('validate', function () {
  it('is aware that undefined argIndex means 0', function () {
    validate({
               task: { '1': 'x', '2': 'x' },
               pipe: {
                 'a': [ '1', '2' ] // pipe['a'][2] here defaults to 0
               }
             }).should.be.ok
  })

  it('throws if an additional function name is `return`', function () {
    ;(function () {
      validate({ task: {}, pipe: {} },
               {
                 'return': Function.prototype
               })
    }).should.throwError(/Reserved function name/)
  })

  it('throws if an additional function name is `arguments`', function () {
    ;(function () {
      validate({ task: {}, pipe: {} },
               {
                 'arguments': Function.prototype
               })
    }).should.throwError(/Reserved function name/)
  })

  it('throws if an additional function name is `argument[N]`', function () {
    ;(function () {
      validate({ task: {}, pipe: {} },
               {
                 'arguments[0]': Function.prototype
               })
    }).should.throwError(/Reserved function name/)

    ;(function () {
      validate({ task: {}, pipe: {} },
               {
                 'arguments[1]': Function.prototype
               })
    }).should.throwError(/Reserved function name/)
  })

  it('throws if an additional function name start with a `.`', function () {
    ;(function () {
      validate({ task: {}, pipe: {} },
               {
                 '.foo': Function.prototype
               })
    }).should.throwError(/Function name cannot start with a dot/)
  })

  it('throws if an additional function name start with a `&`', function () {
    ;(function () {
      validate({ task: {}, pipe: {} },
               {
                 '&bar': Function.prototype
               })
    }).should.throwError(/Function name cannot start with an ampersand/)
  })

  it('throws if pipe or task is not an object', function () {
    ;(function () { validate({ task: 'not an object', pipe: {} }) }).should.throwError(/Not an object: task/)

    ;(function () { validate({ pipe: 'not an object', task: {} }) }).should.throwError(/Not an object: pipe/)
  })

  it('throws if some pipe has invalid type', function () {
    ;(function () { validate({ task: {}, pipe: { '1': [ '1', '2', 'zero' ] } }) }).should.throwError(/Invalid pipe:/)

    ;(function () { validate({ task: {}, pipe: { '1': [ '1', 2, 0 ] } }) }).should.throwError(/Invalid pipe:/)

    ;(function () { validate({ task: {}, pipe: { '1': [ 1, '2', 0 ] } }) }).should.throwError(/Invalid pipe:/)
  })

  it('throws if pipe has duplicates', function () {
    ;(function () {
        validate(
          { task: { '1': 'foo', '2': 'bar' },
            pipe: {
             'a': [ '1', '2', 1 ],
             'b': [ '1', '2', 1 ],
            }
          })
      }).should.throwError(/Duplicated pipe:/)

    ;(function () {
        validate(
          { task: { '1': 'foo', '2': 'bar' },
            pipe: {
             'a': [ '1', '2', 0 ],
             'b': [ '1', '2' ] // Since pipe['b'][2] defaults to 0, pipe['b'] is a duplicate.
            }
          })
      }).should.throwError(/Duplicated pipe:/)
  })

  it('throws if some pipe is orphan', function () {
    ;(function () {
        validate(
          { task: {},
            pipe: {
             'a': [ '1', '2', 0 ]
            }
          })
      }).should.throwError(/Orphan pipe:/)
  })

  it('throws if some func is not a valid (sub)graph', function () {
    ;(function () {
        validate(
          { task: {},
            pipe: {},
            func: {
              'a': { task: {},
                     pipe: {
                       'a': [ '1', '2', 0 ]
                     }
                   }
            }
          })
      }).should.throwError(/Orphan pipe:/)
  })
})
