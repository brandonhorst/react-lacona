import _ from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'

import { Option } from './option'

export class Options extends React.Component {
  constructor () {
    super()
    this.options = []
    this.coords = [0, 0]
  }

  getOption (index) {
    return this.options[index]
  }

  mouseMoved (coords) {
    return coords[0] !== this.coords[0] || coords[1] !== this.coords[1]
  }

  handleMouseMove (e) {
    this.coords = [e.pageX, e.pageY]
  }

  render() {
    const divs = this.props.outputs.map((option, index) => {
      const select = () => this.props.select(index)
      const execute = () => this.props.execute(index)

      const hint = this.props.showHints ? (
        index === this.props.selection ?
          '↩' :
          (index < 9 ? `⌥${index + 1}` : '')
        ) : ''


      return <Option
        ref={c => this.options[index] = c}
        key={index}
        selected={index === this.props.selection}
        mouseMoved={this.mouseMoved.bind(this)}
        option={option}
        select={select}
        execute={execute}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        hint={hint}  />
    })

    const notEmpty = !!this.props.outputs.length

    return divs.length
      ? <div
          className={`options ${notEmpty ? 'not-empty' : ''}`}
          onMouseMove={this.handleMouseMove.bind(this)}
          onContextMenu={e => e.preventDefault()}>
          {divs}
        </div>
      : <div className='options'></div>
  }
}
