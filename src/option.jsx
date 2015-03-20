import React from 'react'

export default class LaconaOption extends React.Component {
  render() {
    const divs = ['match', 'suggestion', 'completion'].map(type => {
      return this.props.option[type].map(item => {
        const className = `${type} category-${item.category}${item.input ? ' highlighted' : ''}`
        return <div className={className}>{item.string}</div>
      })
    }).reduce((prev, current) => prev.concat(current)) //join

    const className = `option${(this.props.selected ? ' selected' : '')}`

    return <div className={className}>{divs}</div>
  }
}
