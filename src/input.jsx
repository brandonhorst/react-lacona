import React from 'react'
import {findDOMNode} from 'react-dom'

export default class LaconaInput extends React.Component {
  componentDidMount() {
    if (this.props.autoFocus) {
      findDOMNode(this).focus()
    }
  }

  change(e) {
    this.props.update(e.target.value)
  }

  focus() {
    findDOMNode(this.refs.input).focus()
  }

  focusEnd () {
    const elem = findDOMNode(this.refs.input)
    const pos = this.props.userInput.length

    if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.move('character', pos);
      range.select();
    } else {
      if(elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(pos, pos);
      } else {
        elem.focus();
      }
    }
    elem.scrollLeft = elem.scrollWidth //just pretty big
  }

  blur() {
    findDOMNode(this.refs.input).blur()
  }

  keyDown(e) {
    this.props.userInteracted()
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
    } else if (e.keyCode === 39) { //right
      const node = findDOMNode(this.refs.input)
      if ((node.selectionStart === node.selectionEnd) && (node.selectionStart === this.props.userInput.length)) {
        this.props.completeSelection()
      } else {
        return
      }
    } else if (e.altKey && e.keyCode >= 49 && e.keyCode <= 57) {
      this.props.execute(e.keyCode - 49)
    } else {
      return
    }
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    return <input
      type='text'
      className='input'
      ref='input'
      tabIndex={this.props.tabIndex}
      autoCorrect={false}
      spellCheck={false}
      autoCapitalize={false}
      value={this.props.userInput}
      onChange={this.change.bind(this)}
      onKeyDown={this.keyDown.bind(this)}
      onFocus={this.props.onFocus}
      onBlur={this.props.onBlur}
      onClick={this.props.userInteracted}
      placeholder={this.props.placeholder} />
  }
}
