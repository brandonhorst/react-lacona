import React from 'react'

import Option from './option'
import fulltext from 'lacona-util-fulltext'

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
  render() {
    const divs = this.props.outputs.map((option, index) => {
      const execute = () => {this.props.execute(index)}
      const select = () => {this.props.select(index)}
      const selected = index === this.props.selectedPhraseIndex

      return <Option
        execute={execute}
        select={select}
        key={index}
        selectedItemNumber={this.props.selectedItemNumber}
        selected={selected}
        option={option}
      />
    })

    return <div className='options' ref='options'>{divs}</div>
  }
}
