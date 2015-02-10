var React = require('react')

var input = React.createFactory('input')

var LaconaInput = React.createClass({
  displayName: 'Lacona Input',
  render: function () {
    return input({
      type: 'text',
      className: 'input',
      value: this.props.userInput,
      onChange: function (e) {
        this.props.update(e.target.value)
      }.bind(this),
      onKeyDown: function (e) {
        if (e.keyCode === 9) { // tab
          this.props.completeSelection()
        } else if (e.keyCode === 38) { // up
          this.props.moveSelection(-1)
        } else if (e.keyCode === 40) { // down
          this.props.moveSelection(1)
        } else if (e.keyCode === 13) { // return
          this.props.execute()
        } else if (e.keyCode === 27) { // escape
          this.props.cancel()
        } else {
          return
        }
        e.preventDefault()
      }.bind(this)
    })
  }
})

module.exports = LaconaInput
