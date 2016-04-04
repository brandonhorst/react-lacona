import _ from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'

const SPECIALCASES = {
  URL: 1,
  bookmark: 2,
  song: 2,
  contact: 1,
  relationship: 3,
  'reminder title': 0
}

export function hashArgument (str) {
  const specialCase = SPECIALCASES[str]
  if (specialCase != null) return specialCase

  if (!str || str === '') return -1

  return Math.abs(str.split('').reduce((a,b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)) % 8
}

class Placeholder extends React.Component {
  render () {
    return (
      <div className='placeholder'>
        {_.chain(this.props.item.placeholderTexts)
          .map((desc, index) => {
            const className = `placeholder-component category-argument${hashArgument(desc)}`
            return [
              <div className='placeholder-component category-conjunction' key={index + ','}>, </div>,
              <div className={className} key={index}>{desc}</div>
            ]
          })
          .flatten()
          .tail()
          .value()
        }
      </div>
    )
  }
}
//
// function getCorners(elem, parentBoundingRect) {
//   const rects = elem.getClientRects()
//   const bounds = elem.getBoundingClientRect()
//
//   return {
//     topLeft: rects[0].left - parentBoundingRect.left,
//     topTop: rects[0].top - parentBoundingRect.top,
//     bottomRight: _.last(rects).right - parentBoundingRect.left,
//     bottomTop: _.last(rects).top - parentBoundingRect.top,
//     boundRight: bounds.right - parentBoundingRect.left,
//     wrapped: rects.length > 1
//   }
// }

export class Option extends React.Component {
  constructor () {
    super()
    this.updateCount = 0
  }

  componentDidMount () {
    this.componentDidUpdate()
  }

  componentDidUpdate (nextProps = {}) {
    const words = findDOMNode(this.refs.words)
    const descs = findDOMNode(this.refs.descriptors)
    const wordsRect = words.getBoundingClientRect()

    const all = _.zip(_.toArray(words.children), _.toArray(descs.children))

    _.forEach(all, ([word, desc]) => {
      const rects = word.getClientRects()
      let rect = rects[0] //use _.last for RTL
      const lines = _.groupBy(rects, 'top')
      const keys = Object.keys(lines)
      if (keys.length > 1) {
        const firstLineRects = lines[keys[0]]
        const secondLineRects = lines[keys[1]]
        if (_.last(firstLineRects).right - firstLineRects[0].left < 50 && _.last(secondLineRects).right - secondLineRects[0].left >= 50) {
          rect = secondLineRects[0]
        }
      }

      desc.style.left = `${rect.left - wordsRect.left}px`
      // // RTL
      // desc.style.right = `${wordsRect.right - rect.right}px`
      // 9 for Lacona, 6 for Lacona.io
      desc.style.top = `${rect.top - wordsRect.top + 9}px`
    })
  }

  handleMouseMove (e) {
    const coords = [e.pageX, e.pageY]
    if (this.props.mouseMoved(coords)) {
      this.props.select()
    }
  }

  render () {
    const itemGroups = _.chain(this.props.option.words)
      .reduce((acc, item) => {
        const last = _.last(_.last(acc))
        if (last && last.argument === item.argument) {
          _.last(acc).push(item)
        } else {
          acc.push([item]);
        }
        return acc
      }, [])
      .value()

    const descriptors = _.chain(itemGroups)
      .map((itemGroup, index) => {
        if (itemGroup.length === 1 && itemGroup[0].placeholder) {
          return <div className='descriptor' key={index}></div>
        } else {
          const first = _.first(itemGroup)
          const className = `descriptor category-argument${hashArgument(first.argument)} category-${first.category}`
          return <div className={className} key={index}>{first.argument}</div>
        }
      })
      // .map(elem => [<div className='spacer-left' />, elem, <div className='spacer-right' />])
      .flatten()
      .value()

    const words = _.map(itemGroups, (itemGroup, index) => {
      const first = _.first(itemGroup)
      const className = `word category-argument${hashArgument(first.argument)}`

      return (
        <div className={className} key={index}>
          {_.map(itemGroup, (item, index) => {
            if (item.placeholder) {
              return <Placeholder item={item} key={index} />
            } else {
              const className = `word-component${item.input ? ' highlighted' : ''} category-${item.category}${item.fallthrough ? ' fallthrough' : ''}${item.decorator ? ' decorator' : ''}`
              return <div className={className} key={index}>{item.text}</div>
            }
          })}
        </div>
      )
    })

    const className = `option${(this.props.selected ? ' selected' : '')}`
    return (
      <div
        className={className}
        onMouseOver={this.handleMouseMove.bind(this)}
        onClick={this.props.execute}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}>
        <div className='hint'>{this.props.hint}</div>
        <div className='descriptors' ref='descriptors'>{descriptors}</div>
        <div className='words' ref='words'>{words}</div>
        {/*<div className='ellipsis'>{this.props.option.ellipsis ? '…' : ''}</div>*/}
      </div>
    )
  }
}
