var _ = require('lodash')
var React = require('react')
var fulltext = require('lacona-util-fulltext')

var laconaOptions = React.createFactory(require('./options'))
var laconaInput = React.createFactory(require('./input'))
var div = React.createFactory('div')

function bound (number, max) {
  return Math.max(Math.min(number, max - 1), 0)
}

var LaconaView = React.createClass({
  displayName: 'Lacona View',
  getInitialState: function () {
    var hasOutputs = this.props.outputs.length > 0
    return {
      userInput: this.props.initialInput || '',
      selection: hasOutputs ? 0 : -1,
      selectedId: hasOutputs ? this.props.outputs[0].id : -1
    }
  },
  getDefaultProps: function () {
    return {
      outputs: [],
      update: function () {},
      cancel: function () {},
      change: function () {}
    }
  },
  componentWillReceiveProps: function (nextProps) {
    var newSelection
    // if there are outputs
    if (nextProps.outputs.length > 0) {
      // if something was selected in the past
      if (this.state.selectedId > -1) {
        newSelection = _.findIndex(nextProps.outputs, {id: this.state.selectedId})
        if (newSelection > -1) {
          this.setState({
            selection: newSelection
          })
          return
        }
      }
      newSelection = bound(this.state.selection - 1, nextProps.outputs.length)
      this.setState({
        selection: newSelection,
        selectedId: nextProps.outputs[newSelection].id
      })
    } else {
      this.setState({
        selection: -1,
        selectedId: -1
      })
    }
  },
  componentDidMount: function () {
    this.props.change()
  },
  componentDidUpdate: function () {
    this.props.change()
  },
  completeSelection: function () {
    if (this.state.selection > -1) {
      var newString = fulltext.match(this.props.outputs[this.state.selection].data) +
        fulltext.suggestion(this.props.outputs[this.state.selection].data)

      this.update(newString)
    }
  },
  moveSelection: function (steps) {
    var selection = bound(this.state.selection + steps, this.props.outputs.length)
    this.setState({
      selection: selection,
      selectedId: this.props.outputs[selection].id
    })
  },
  execute: function () {
    if (this.state.selectedId > -1) {
      this.setState({userInput: ""})
      this.props.execute(this.state.selectedId)
    }
  },
  cancel: function () {
    this.setState({userInput: ""})
    this.props.cancel()
  },
  update: function (newText) {
    this.setState({userInput: newText})
    this.props.update(newText)
  },
  render: function () {
    return div({className: 'lacona-view'},
      laconaInput({
        update: this.update,
        completeSelection: this.completeSelection,
        moveSelection: this.moveSelection,
        userInput: this.state.userInput,
        execute: this.execute,
        cancel: this.cancel
      }),
      laconaOptions({
        outputs: this.props.outputs,
        selection: this.state.selection
      })
    )
  }
})

module.exports = LaconaView
