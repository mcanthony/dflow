
var dflow = require('../index')

var emptyGraph = new dflow.Graph()

describe('evaluate', function () {
  it('does not change empty graphs', function () {
    var graph = dflow.evaluate(emptyGraph)

    graph.should.eql(emptyGraph)
  })
})