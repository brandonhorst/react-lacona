import React from 'react'

import Option from './option'

export default class Options extends React.Component {
  // componentDidUpdate() {
  //   const scrolledDiv = React.findDOMNode(this.refs.options)
  //   const scrolledAmount = scrolledDiv.scrollTop
  //   const scrollHeight = 400
  //
  //   const selectedDiv = React.findDOMNode(this.refs.selection)
  //   const divHeight = 40
  //   const divPos = this.props.selection * 40
  //
  //
  //   if (divPos < scrolledAmount) {
  //     scrolledDiv.scrollTop = divPos
  //   } else if (divPos > scrollHeight + scrolledAmount - divHeight) {
  //     scrolledDiv.scrollTop = divPos - (scrollHeight - divHeight)
  //   }
  // }
  //

  getOption (index) {
    return this.refs[index]
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
        ref={index}
        key={index}
        selected={index === this.props.selection}
        option={option}
        select={select}
        execute={execute}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        hint={hint}  />
    })

    return divs.length ? <div className='options' ref='options'>{divs}</div> : null
  }
}
