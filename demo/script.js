var React = require('react')
var reactLacona = React.createFactory(require('..'))

var outputs = [{
  id: 0,
  data: {
    match: [{string: 'match', category: 'match', input: true}],
    suggestion: [
      {string: 'sugg', category: 'suggestion', input: false},
      {string: 'estion', category: 'suggestion', input: true}
    ],
    completion: [{string: 'completion', category: 'completion', input: false}]
  }
}, {
  id: 1,
  data: {
    match: [{string: 'match2', category: 'match', input: true}],
    suggestion: [
      {string: 'sugg', category: 'suggestion', input: false},
      {string: 'estion2', category: 'suggestion', input: true}
    ],
    completion: [{string: 'completion2', category: 'completion', input: false}]
  }
}]

var demo = React.createFactory(React.createClass({
  displayName: 'Lacona Demo',
  handleUpdate: function (newText) {
    console.log('update: ', newText)
  },
  handleExecute: function (id) {
    console.log('execute: ', id)
  },
  handleCancel: function (id) {
    console.log('cancel: ', id)
  },
  render: function () {
    return reactLacona({
      update: this.handleUpdate,
      execute: this.handleExecute,
      cancel: this.handleCancel,
      outputs: outputs
    })
  }
}))

React.render(demo(), document.body)
