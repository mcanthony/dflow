
var assert = require('assert');
var EventEmitter = require('events').EventEmitter;

var dflow = require('../index.js');

var Element = dflow.Element;
var Node    = dflow.Node;

var doNothing = function () {}

var dummy = {task: doNothing};

describe('Node', function () {
  describe('constructor:', function () {
    describe('arg task', function () {
      it('defaults to a dummy function', function () {
        var node = new Node();
        assert.ok(node instanceof Node);
      });
    });

    it('does not require ins and outs, which default to []', function () {
      var node = new Node();

      assert.deepEqual(node.getIns(), []);
      assert.deepEqual(node.getOuts(), []);
    });
  });

  describe('inheritance:', function () {
    it('is an Element', function () {
      var node = new Node(dummy);
      assert.ok(node instanceof Element);
    });

    it('is an EventEmitter', function () {
      var node = new Node(dummy);
      assert.ok(node instanceof EventEmitter);
    });
  });

  describe('', function () {
    it('', function () {
    });
  });

  describe('getIns', function () {
    it('', function () {
    });
  });

  describe('getOuts', function () {
    it('', function () {
    });
  });

  describe('toJSON', function () {
    it('', function () {
    });
  });

});

