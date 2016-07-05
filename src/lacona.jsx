import _ from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'

import { Options } from './options'
import { Input } from './input'

function bound (number, max) {
  return Math.max(Math.min(number, max - 1), 0)
}

export { hashArgument } from './option'

export class LaconaView extends React.Component {
  constructor (props) {
    super(props)

    this.setByMouse = false

    this.blurMatters = true

    const hasOutputs = props.length > 0
    this.state = {selection: hasOutputs ? 0 : -1}
  }

  componentWillReceiveProps (nextProps) {
    const hasOutputs = nextProps.outputs.length > 0
    this.setState({selection: hasOutputs ? bound(this.state.selection, nextProps.outputs.length) : -1})
  }

  handleScroll () {
    const optionsDOM = findDOMNode(this.options)
    const preview = document.getElementsByClassName('preview-wrapper')[0]
    if (preview) {
      preview.style.marginTop = `-${optionsDOM.scrollTop + 5}px`
    }
  }

  componentDidMount () {
    const optionsDOM = findDOMNode(this.options)
    optionsDOM.addEventListener('scroll', this.handleScroll.bind(this))

    this.componentDidUpdate()
  }

  componentDidUpdate () {
    this.handleScroll()
    if (this.state.selection > -1 && !this.setByMouse) {
      const optionsDOM = findDOMNode(this.options)
      const optionsRect = optionsDOM.getBoundingClientRect()
      const option = this.options.getOption(this.state.selection)
      if (option) {
        // scroll visible option into view
        const selectedRect = findDOMNode(option).getBoundingClientRect()
        if (selectedRect.top < optionsRect.top) {
          optionsDOM.scrollTop -= (optionsRect.top - selectedRect.top)
        } else if (selectedRect.bottom > optionsRect.bottom) {
          optionsDOM.scrollTop += (selectedRect.bottom - optionsRect.bottom)
        }
      }
    }
    this.props.change()
  }

  completeSelection (index = this.state.selection) {
    if (index > -1) {
      const result = this.props.outputs[index]
      const newString = _.chain(result.words)
        .takeWhile(item => !item.placeholder)
        .map('text')
        .join('')
        .value()

      this.props.clearPrefix()

      this.update(newString)
    }
  }

  moveSelection (steps) {
    this.setByMouse = false
    const selection = bound(this.state.selection + steps, this.props.outputs.length)
    this.setState({selection})
  }

  execute (index = this.state.selection) {
    if (index > -1) {
      const result = this.props.outputs[index]
      if (!result) return

      if (_.some(result.words, 'placeholder')) {
        this.completeSelection(index)
        this.input.focusEnd()
      } else {
        this.update('')
        this.setState({showHints: false})
        this.props.execute(index)
        this.props.onBlur()
      }
    }
  }

  select (index) {
    this.setByMouse = true
    const selection = bound(index, this.props.outputs.length)
    this.setState({selection})
  }

  cancel () {
    this.props.cancel()
  }

  update (newText) {
    this.props.update(newText)
  }

  focusEnd () {
    this.input.focusEnd()
  }

  onFocus (event) {
    this.setState({showHints: true})
    this.props.onFocus(event)
  }

  onBlur (event) {
    if (!this.blurMatters) return
    this.setState({showHints: false})
    this.props.onBlur(event)
  }

  mouseDown () {
    this.blurMatters = false
    this.props.userInteracted()
  }

  mouseUp () {
    this.blurMatters = true
  }

  focus () {
    this.input.focus()
  }

  blur () {
    this.input.blur()
  }

  render () {
    return (
      <div className='lacona-view'>
        <Input
          ref={c => this.input = c}
          update={this.update.bind(this)}
          prefix={this.props.prefix}
          suffix={this.props.suffix}
          tabIndex={this.props.tabIndex}
          completeSelection={this.completeSelection.bind(this)}
          moveSelection={this.moveSelection.bind(this)}
          userInput={this.props.userInput}
          execute={this.execute.bind(this)}
          cancel={this.cancel.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          userInteracted={this.props.userInteracted}
          placeholder={this.props.placeholder} />
        <Options
          ref={c => this.options = c}
          outputs={this.props.outputs}
          selection={this.state.selection}
          execute={this.execute.bind(this)}
          select={this.select.bind(this)}
          showHints={this.state.showHints}
          onMouseDown={this.mouseDown.bind(this)}
          onMouseUp={this.mouseUp.bind(this)} />
      </div>
    )
  }
}

LaconaView.defaultProps = {
  outputs: [],
  update () {},
  cancel () {},
  change () {},
  execute () {},
  select () {},
  onFocus () {},
  onBlur () {},
  userInteracted () {},
  clearPrefix () {}
}
