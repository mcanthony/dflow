
var dotOperatorRegex = require('../regex/accessor')

/**
 * Inject functions that emulate dot operator.
 *
 * @api private
 *
 * @param {Object} funcs reference
 * @param {Object} graph
 */

function injectDotOperator (funcs, graph) {

  /**
   * Inject dot operator.
   */

  function inject (taskKey) {
    var accessorName,
        taskName = graph.task[taskKey]

    /**
     * Dot operator like function.
     *
     * @param {String} attributeName
     * @param {Object} obj
     *
     * @returns {*} attribute
     */

    function dotOperator (attributeName, obj) {
      if (typeof obj !== 'object')
        obj = {}

      return obj[attributeName]
    }

    if (dotOperatorRegex.test(taskName)) {
      attributeName = taskName.substring(1)

      funcs[taskName] = dotOperator.bind(null, attributeName)
    }
  }

  Object.keys(graph.task).forEach(inject)
}

module.exports = injectDotOperator
