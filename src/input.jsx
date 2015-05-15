import React from 'react'

export default class LaconaInput extends React.Component {
  change(e) {
    this.props.update(e.target.value)
  }

  keyDown(e) {
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
  }

  render() {
    return (
      <div className='input'>
        <div className={`prefix${this.props.prefix ? '' : ' hidden'}`}>{this.props.prefix}</div>
        <input type='text' autoCorrect={false} spellCheck={false}
          autoCapitalize={false} className='true-input' value={this.props.userInput}
          onChange={this.change.bind(this)} onKeyDown={this.keyDown.bind(this)} />
        <div className={`suffix${this.props.suffix ? '' : ' hidden'}`}>{this.props.suffix}</div>
      </div>
    )
  }
}
