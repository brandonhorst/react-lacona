import _ from 'lodash'
import React from 'react'

class Placeholder extends React.Component {
  render () {
    return (
      <div className='placeholder'>
        {_.chain(this.props.item.placeholderDescriptors)
          .map((desc, index) => {
            const className = `placeholder-component descriptor-${_.kebabCase(desc)}`
            return [
              <div className='placeholder-component category-conjunction' key={index + ','}>, </div>,
              <div className={className} key={index}>{desc}</div>
            ]
          })
          .flatten()
          .rest()
          .value()
        }
      </div>
    )
  }
}

export default class LaconaOption extends React.Component {
  componentDidMount () {
    this.componentDidUpdate()
  }

  componentDidUpdate (nextProps = {}) {
    if (nextProps.option === this.props.option) return
    const items = _.zip(
      _.toArray(React.findDOMNode(this.refs.descriptors).children),
     	_.toArray(React.findDOMNode(this.refs.words).children)
    )

    _.forEach(items, ([annotation, content]) => {
      annotation.style.width = 'auto'
      const max = Math.max(content.offsetLeft - annotation.offsetLeft + content.offsetWidth, annotation.offsetWidth + 1)
      annotation.style.width = `${max}px`
    })
  }

  render () {
    const itemGroups = _.chain(['match', 'suggestion', 'completion'])
      .map(type => _.map(this.props.option[type], word => ({word, type})))
      .flatten()
      .reduce((acc, item) => {
        const last = _.last(_.last(acc))
        if (last && last.word.topLevelDescriptor === item.word.topLevelDescriptor) {
          _.last(acc).push(item)
        } else {
          acc.push([item]);
        }
        return acc
      }, [])
      .value()

    const descriptors = _.map(itemGroups, (itemGroup, index) => {
      if (itemGroup.length === 1 && itemGroup[0].word.placeholder) {
        return <div className='descriptor' key={index}></div>
      } else {
        const first = _.first(itemGroup).word
        const className = `descriptor descriptor-${_.kebabCase(first.topLevelDescriptor)} category-${first.category}`
        return <div className={className} key={index}>{first.topLevelDescriptor}</div>
      }
    })

    const words = _.map(itemGroups, (itemGroup, index) => {
      const first = _.first(itemGroup).word
      const className = `word descriptor-${_.kebabCase(first.topLevelDescriptor)} category-${first.category}`

      return (
        <div className={className} key={index}>
          {_.map(itemGroup, (item, index) => {
            if (item.word.placeholder) {
              return <Placeholder item={item.word} key={index} />
            } else {
              const className = `word-component ${item.type}${item.word.input ? ' highlighted' : ''}`
              return <div className={className} key={index}>{item.word.string}</div>
            }
          })}
        </div>
      )
    })

    const className = `option${(this.props.selected ? ' selected' : '')}`
    return (
      <div className={className}>
        <div className='descriptors' ref='descriptors'>{descriptors}</div>
        <div className='words' ref='words'>{words}</div>
      </div>
    )
  }
}
