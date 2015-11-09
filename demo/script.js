import React from 'react'
import {render} from 'react-dom'
import {combinePlaceholders} from 'lacona-utils'
import {Parser} from 'lacona'
import {createElement} from 'lacona-phrase'
import ReactLacona from '..'

const parser = new Parser()

parser.grammar = createElement('list', {items: ['Batman', 'Spiderman', 'Superman']})

class Demo extends React.Component {
  constructor () {
    super()
    this.state = {outputs: []}
  }

  handleUpdate (input) {
    console.log('update: ', input)
    const outputs = parser.parseArray(input)
    const combined = combinePlaceholders(outputs)
    this.setState({outputs: combined})
  }

  handleExecute (id) {
    console.log('execute: ', id)
  }

  handleCancel (id) {
    console.log('cancel: ', id)
  }

  render () {
    return <ReactLacona
      update={this.handleUpdate.bind(this)}
      execute={this.handleExecute.bind(this)}
      cancel={this.handleCancel.bind(this)}
      outputs={this.state.outputs}
    />
  }
}

render(<Demo />, document.getElementById('demo'))
