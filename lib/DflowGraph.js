
var dflow = require('../index')
  , iper  = require('iper')
  , util  = require('util')

var DflowEdge = dflow.DflowEdge
  , DflowNode = iper.DflowNode

var IperGraph = iper.IperGraph

function DflowGraph() {
  IperGraph.call(this)
}

util.inherits(DflowGraph, IperGraph)

function createEdge() {

}
DflowGraph.prototype.createEdge = createEdge

function createNode() {

}
DflowGraph.prototype.createNode = createNode

module.exports = DflowGraph
