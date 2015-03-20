import _ from 'lodash'
import React from 'react'
import fulltext from 'lacona-util-fulltext'

import LaconaOptions from './options'
import LaconaInput from './input'

function bound (number, max) {
  return Math.max(Math.min(number, max - 1), 0)
}

export default class LaconaView extends React.Component {
  constructor(props) {
    super(props)

    const hasOutputs = this.props.outputs.length > 0
    this.state = {
      userInput: this.props.initialInput || '',
      selection: hasOutputs ? 0 : -1,
      selectedKey: hasOutputs ? fulltext.all(this.props.outputs[0]) : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    let newSelection
    // if there are outputs
    if (nextProps.outputs.length > 0) {
      // if something was selected in the past
      if (this.state.selection > -1) {
        newSelection = _.findIndex(nextProps.outputs, output => fulltext.all(output) === this.state.selectedKey)
        if (newSelection > -1) {
          this.setState({selection: newSelection})
          return
        }
      }
      newSelection = bound(this.state.selection - 1, nextProps.outputs.length)
      this.setState({
        selection: newSelection,
        selectedKey: fulltext.all(nextProps.outputs[newSelection])
      })
    } else {
      this.setState({
        selection: -1,
        selectedKey: ''
      })
    }
  }

  componentDidMount() {
    this.props.change()
  }

  componentDidUpdate() {
    this.props.change()
  }

  completeSelection() {
    if (this.state.selection > -1) {
      const newString = fulltext.match(this.props.outputs[this.state.selection]) +
        fulltext.suggestion(this.props.outputs[this.state.selection])

      this.update(newString)
    }
  }

  moveSelection(steps) {
    const selection = bound(this.state.selection + steps, this.props.outputs.length)
    this.setState({
      selection: selection,
      selectedKey: fulltext.all(this.props.outputs[selection])
    })
  }

  execute() {
    if (this.state.selection > -1) {
      this.setState({userInput: ""})
      this.props.execute(this.state.selection)
    }
  }

  cancel() {
    this.setState({userInput: ""})
    this.props.cancel()
  }

  update(newText) {
    this.setState({userInput: newText})
    this.props.update(newText)
  }

  render() {
    return (
      <div className='lacona-view'>
        <LaconaInput update={this.update.bind(this)}
          completeSelection={this.completeSelection.bind(this)}
          moveSelection={this.moveSelection.bind(this)}
          userInput={this.state.userInput}
          execute={this.execute.bind(this)} cancel={this.cancel.bind(this)} />
        <LaconaOptions outputs={this.props.outputs} selection={this.state.selection} />
      </div>
    )
  }
}

LaconaView.defaultProps = {
  outputs: [],
  update: function () {},
  cancel: function () {},
  change: function () {},
  execute: function () {}
}
