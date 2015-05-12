import _ from 'lodash'
import Phrase from './phrase'
import React from 'react'

function wordize (words) {
  return words.map((item, index) => {
    const categoryList = item.category || ''
    const categories = categoryList.split(' ').map(cat => `category-${cat}`).join(' ')
    const className = `${categories}${item.input ? ' highlighted' : ''}${item.placeholder ? ' placeholder' : ''}`
    return <div className={className} key={index}>{item.string}</div>
  })

}

export default class LaconaOption extends React.Component {
  click(e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.execute()
  }

  render() {
    const className = `option${this.props.selected ? ' selected' : ''}`
    const backgroundStyle = this.props.selected ? {marginTop: 28 * this.props.selectedItemNumber} : {}
    return (
      <div className={className} onClick={this.click.bind(this)}>
        <div className='background' style={backgroundStyle} onMouseOver={this.props.select} />
        {_.map(this.props.option, (phrase, i) => {
          return <Phrase
            phrase={phrase}
            key={i}
            selectedItemNumber={this.props.selected ? this.props.selectedItemNumber : undefined} />
        })}
      </div>
    )
    // const match = wordize(this.props.option.match)
    // const completion = wordize(this.props.option.completion)
    // const suggestions = _.chain(this.props.option.suggestions)
    //   .map(wordize)
    //   .map(words => <div className='suggestion-option'>{words}</div>)
    //   .value()
    // const divs = (
    //   <div>
    //     <div className='match'>{match}</div>
    //     <div className='suggestion'>
    //       <div className='descriptor'>{this.props.option.suggestionDescriptor}</div>
    //       <div className='suggestion-options'>{suggestions}</div>
    //     </div>
    //     <div className='completion'>{completion}</div>
    //   </div>
    // )
    //
    // const className = `option${(this.props.selected ? ' selected' : '')}`
    // const qualifiers = this.props.option.qualifiers ? `(${this.props.option.qualifiers.join(', ')})` : null
    //
    // const hint = this.props.selected ? '↩' : ''
    //
    // return (
    //   <div onMouseDown={this.click.bind(this)} onMouseMove={this.props.select} className={className}>
    //     <div className='hint'>{hint}</div>
    //     <div className='words'>{divs}</div>
    //     <div className='qualifiers'>{qualifiers}</div>
    //   </div>
    // )
  }
}
