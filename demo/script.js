import React from 'react'
import ReactLacona from '..'

var outputs = [{
  words: [{string: 'super', input: 'true'}]
}]

class Demo {
  handleUpdate (newText) {
    console.log('update: ', newText)
  }

  handleExecute (id) {
    console.log('execute: ', id)
  }

  handleCancel (id) {
    console.log('cancel: ', id)
  }

  render () {
    return <ReactLacona update={this.handleUpdate}
      execute={this.handleExecute}
      cancel={this.handleCancel}
      outputs={outputs}
    />
  }
}

React.render(<Demo />)
