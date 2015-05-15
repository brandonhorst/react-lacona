import React from 'react'

import Option from './option'
import fulltext from 'lacona-util-fulltext'

export default class Options extends React.Component {
  render() {
    const divs = this.props.outputs.map((option, index) => {
      return <Option key={index} selected={index === this.props.selection}
        option={option} />
    })

    return <div className='options'>{divs}</div>
  }
}
