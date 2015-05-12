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

    const hasOutputs = this.props.outputs.length > 0
    this.state = {
      selection: hasOutputs ? 0 : -1
    }
  }

  getSelectionNumberInPhraseList (number) {
    let totalCount = 0
    let itemNumber

    const phraseIndex = _.findIndex(this.props.outputs, phraseList => {
      const thisCount = getPhraseListItemCount(phraseList)
      if (totalCount + thisCount > number) {
        itemNumber = number - totalCount
        return true
      }

      totalCount += thisCount
      return false
    })

    return {phraseIndex, itemNumber}
  }

  getAllWords (number) {
    const {phraseIndex, itemNumber} = this.getSelectionNumberInPhraseList(number)

    return _.chain(this.props.outputs[phraseIndex])
      .map(phrase => {
        if (phrase.placeholder) return phrase
        if (phrase.words) return phrase.words
        if (phrase.items) return phrase.items[itemNumber]
        return []
      })
      .flatten()
      .value()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.outputs !== this.props.outputs) {
      if (nextProps.outputs.length > 0) {
        this.setSelection(0)
      } else {
        this.setState({selection: -1})
      }
    }
  }

  componentDidMount() {
    this.props.change()
  }

  componentDidUpdate() {
    this.props.change()
  }

  focusBar() {
    this.refs.input.focus()
  }

  moveSelection(steps) {
    const total = getTotalSelectables(this.props.outputs)
    const selection = bound(this.state.selection + steps, total)
    this.setSelection(selection)
  }

  setSelection(selection) {
    this.setState({selection})
    this.props.select(selection)
  }

  complete(selection = this.state.selection, wordList) {
    if (selection > -1) {
      const realWordList = wordList || this.getAllWords(selection)
      const newString = toPlaceholder(realWordList)
      if (newString !== this.props.userInput) {
        this.update(newString)
      }
    }
  }

  execute(selection = this.state.selection) {
    if (selection > -1) {
      const wordList = this.getAllWords(selection)
      if (hasPlaceholder(wordList)) {
        this.complete(selection, wordList)
      } else {
        this.props.execute(selection)
        // this.refs.input.blur() //I am commenting this out, but www.lacona.io needs it
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
        <LaconaInput ref='input' update={this.update.bind(this)}
          completeSelection={this.complete.bind(this)}
          moveSelection={this.moveSelection.bind(this)}
          focus={this.props.focus} blur={this.props.blur}
          userInput={this.props.userInput}
          execute={this.execute.bind(this)} cancel={this.cancel.bind(this)}
          placeholder={this.props.placeholder} autoFocus={this.props.autoFocus} />
        <LaconaOptions outputs={this.props.outputs} selectedPhraseIndex={phraseIndex}
          selectedItemNumber={itemNumber}
          select={this.setSelection.bind(this)} execute={this.execute.bind(this)}/>
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
