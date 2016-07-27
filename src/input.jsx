import React from 'react'
import { findDOMNode } from 'react-dom'

export class Input extends React.Component {
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
    } else if (
      (!e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey && e.keyCode === 38) ||
      (!e.shiftKey && !e.metaKey && !e.altKey && e.ctrlKey && e.keyCode === 75)
    ) { // up or ^k
      this.props.moveSelection(-1)
    } else if (
      (!e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey && e.keyCode === 40) ||
      (!e.shiftKey && !e.metaKey && !e.altKey && e.ctrlKey && e.keyCode === 74)
    ) { //down or ^j
      this.props.moveSelection(1)
    } else if (e.keyCode === 13) { // return
      this.props.execute()
    } else if (e.keyCode === 27) { // escape
      this.props.cancel()
    } else if (
      (!e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey && e.keyCode === 39) ||
      (!e.shiftKey && !e.metaKey && !e.altKey && e.ctrlKey && e.keyCode === 76)
    ) { //right or ^l
      const node = findDOMNode(this.refs.input)
      if ((node.selectionStart === node.selectionEnd) && (node.selectionStart === this.props.userInput.length)) {
        this.props.completeSelection()
      } else {
        if (node.selectionStart === node.selectionEnd) {
          node.setSelectionRange(node.selectionStart + 1, node.selectionStart + 1)
        } else {
          node.setSelectionRange(node.selectionEnd, node.selectionEnd)
        }
      }
    } else if (
      (!e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey && e.keyCode === 37) ||
      (!e.shiftKey && !e.metaKey && !e.altKey && e.ctrlKey && e.keyCode === 72)
    ) { //left or ^h
      const node = findDOMNode(this.refs.input)
      if ((node.selectionStart === node.selectionEnd) && (node.selectionStart >= 1)) {
        node.setSelectionRange(node.selectionStart - 1, node.selectionStart - 1)
      } else {
        node.setSelectionRange(node.selectionStart, node.selectionStart)
      }
    } else if (e.altKey && !e.shiftKey && !e.metaKey && !e.ctrlKey && e.keyCode >= 49 && e.keyCode <= 57) {
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
      className={`input ${this.props.empty ? 'empty' : ''}`}
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
