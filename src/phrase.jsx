import _ from 'lodash'
import React from 'react'

export default class LaconaPhrase extends React.Component {
  item (item, selected, key) {
    const className = `item${selected ? ' selected' : ''}`

    return (
      <div className={className} key={key}>
        {_.map(item.words, (word, i) => word.string == null ?
          <div className='placeholder' key={i}>{_.last(word.descriptors)}</div> :
          <div className='word' key={i}>{word.string}</div>
        )}
      </div>
    )
  }

  render () {
    const offset = 0 //28 * this.props.selectedItemNumber
    if (this.props.phrase.descriptor) {
      if (this.props.phrase.placeholder) {
        return <div className='placeholder' style={{marginTop: offset}}>{this.props.phrase.descriptor}</div>
      } else if (this.props.phrase.items) {
        return (
          <div className='phrase'>
            {_.map(this.props.phrase.items, (itemList, descriptor) => {
              return (
                <div className='itemGroup' key={descriptor}>
                  <div className='descriptor'>{descriptor}</div>
                  {_.map(itemList, (item, index) => this.item(item, index === this.props.selectedItemNumber, index))}
                </div>
              )
            })}
          </div>
        )
      } else {
        return (
          <div className={`phrase${this.props.selectedItemNumber != null ? ' selected' : ''}`} style={{marginTop: offset}}>
            <div className='descriptor'>{this.props.phrase.descriptor}</div>
            {this.item(this.props.phrase.words)}
          </div>
        )
      }
    } else {
      return (
        <div className='words' style={{marginTop: offset}}>
          {_.map(this.props.phrase.words, (word, i) => <div className='word' key={i}>{word.string}</div>)}
        </div>
      )
    }
  }
}
