import _ from 'lodash'
import React from 'react'
import fulltext from 'lacona-util-fulltext'

import LaconaOptions from './options'
import LaconaInput from './input'

function bound (number, max) {
  return Math.max(Math.min(number, max - 1), 0)
}

function toPlaceholder (wordList) {
  return _.chain(wordList)
    .takeWhile(word => !word.placeholder)
    .map('string')
    .join('')
    .value()
}

function hasPlaceholder (wordList) {
  return _.some(wordList, word => word.placeholder)
}

function getPhraseListItemCount (phraseList) {
  const firstComplexPhrase = _.find(phraseList, phrase => phrase.items && phrase.items.length > 1)
  return firstComplexPhrase ? firstComplexPhrase.items.length : 1
}

function getTotalSelectables (outputs) {
  return _.chain(outputs)
    .map(getPhraseListItemCount)
    .sum()
    .value()
}
export default class LaconaView extends React.Component {
  constructor(props) {
    super(props)

    const hasOutputs = props.length > 0
    this.state = {
      userInput: props.initialInput || '',
      selection: hasOutputs ? 0 : -1
      // selectedKey: hasOutputs ? fulltext.all(this.props.outputs[0]) : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const hasOutputs = nextProps.outputs.length > 0
    this.setState({selection: hasOutputs ? 0 : -1})

    // if (nextProps.outputs.length > 0) {

      // if something was selected in the past
      // if (this.state.selection > -1) {
    //     newSelection = _.findIndex(nextProps.outputs, output => fulltext.all(output) === this.state.selectedKey)
    //     if (newSelection > -1) {
    //       this.setState({selection: newSelection})
    //       return
    //     }
    //   }
    //   newSelection = bound(this.state.selection - 1, nextProps.outputs.length)
    //   this.setState({
    //     selection: newSelection,
    //     selectedKey: fulltext.all(nextProps.outputs[newSelection])
    //   })
    // } else {
    //   this.setState({
    //     selection: -1,
    //     selectedKey: ''
    //   })
    // }
  }

  componentDidMount() {
    this.props.change()
  }

  componentDidUpdate() {
    this.props.change()
  }

  completeSelection() {
    if (this.state.selection > -1) {
      const result = this.props.outputs[this.state.selection]
      const newString = _.chain(result.match.concat(result.suggestion, result.completion))
        .takeWhile(item => !item.placeholder)
        .map('string')
        .join('')
        .value()

      this.update(newString)
    }
  }

  moveSelection(steps) {
    const selection = bound(this.state.selection + steps, this.props.outputs.length)
    this.setState({selection})
  }

  execute() {
    if (this.state.selection > -1) {
      const result = this.props.outputs[this.state.selection]
      if (_.some(result.match.concat(result.suggestion, result.completion), 'placeholder')) {
        this.completeSelection()
      } else {
        this.setState({userInput: ''})
        this.props.execute(this.state.selection)
      }
    }
  }

  cancel() {
    this.props.cancel()
  }

  update(newText) {
    this.props.update(newText)
  }

  render() {
    const {phraseIndex, itemNumber} = this.getSelectionNumberInPhraseList(this.state.selection)

    return (
      <div className='lacona-view'>
        <LaconaInput
          update={this.update.bind(this)}
          prefix={this.props.prefix}
          suffix={this.props.suffix}
          completeSelection={this.completeSelection.bind(this)}
          moveSelection={this.moveSelection.bind(this)}
          userInput={this.state.userInput}
          execute={this.execute.bind(this)}
          cancel={this.cancel.bind(this)} />
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
  execute: function () {},
  select: function () {},
  focus: function () {},
  blur: function () {}
}
