import _ from 'lodash'
import React from 'react'
import Preview from './preview'
import { findDOMNode } from 'react-dom'
import hashArgument from 'colorize-lacona-argument'

function getCategories (categories, wordIndex) {
  return _.chain(categories)
    .filter(category => category.start <= wordIndex && category.end > wordIndex)
    .map(category => `category-${category.value}`)
    .filter()
    .value()
}

function getAnnotations (annotations, wordIndex) {
  return _.chain(annotations)
    .filter(annotation => annotation.start === wordIndex)
    .map((annotation, aIndex) => {
      let identifier
      switch (annotation.value.type) {
        case 'icon': 
          identifier = annotation.value.value || annotation.value.path
          return (
            <div
              className='annotation icon-annotation'
              key={aIndex}
              style={{backgroundImage: `url(lacona-icon:${encodeURI(identifier)})`}}>
            </div>
          )
        case 'contact':
          identifier = annotation.value.value || annotation.value.id
          return (
            <div
              className='annotation contact-icon-annotation'
              key={aIndex}
              style={{backgroundImage: `url(lacona-contact-icon:${encodeURI(identifier)})`}}>
            </div>
          )
        case 'image':
          identifier = annotation.value.value || annotation.value.path
          return (
            <div
              className='annotation image-annotation'
              key={aIndex}
              style={{backgroundImage: `url(lacona-image:${encodeURI(identifier)})`}}>
            </div>
          )
        case 'text':
          return (
            <div className='annotation text-annotation' key={aIndex}>
              {annotation.value.value}
            </div>
          )
      }
    })
    .filter()
    .value()
}

function getQualifiers (qualifiers, wordIndex) {
  return _.chain(qualifiers)
    .filter(qualifier => qualifier.end - 1 === wordIndex)
    .map((qualifier, qIndex) => {
      return (
        <div className='qualifier' key={qIndex}>
          {qualifier.value}
        </div>
      )
    })
    .value()

}

class Placeholder extends React.Component {
  render () {
    return (
      <div className='placeholder'>
        {_.chain(this.props.word.placeholderTexts)
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
    const argumentGroups = _.map(this.props.option.arguments, (argument) => ({
      argument,
      words: this.props.option.words.slice(argument.start, argument.end)
    }))

    const descriptors = _.chain(argumentGroups)
      .map(({argument}, index) => {
        const className = `descriptor category-argument${hashArgument(argument.value)}`
        return <div className={className} key={index}>{argument.value}</div>
      })
      .flatten()
      .value()

    const words = _.map(argumentGroups, ({words, argument}, index) => {
      const className = `word category-argument${hashArgument(argument.value)}`

      return (
        <div className={className} key={index}>
          {_.map(words, (word, index) => {
            const thisWordOutput = []
            const trueIndex = argument.start + index
            const annotations = getAnnotations(this.props.option.annotations, trueIndex)
            const qualifiers = getQualifiers(this.props.option.qualifiers, trueIndex)
            const categories = getCategories(this.props.option.categories, trueIndex)

            if (annotations.length) {
              thisWordOutput.push(<div className='annotations'>{annotations}</div>)
            }

            if (word.placeholder) {
              thisWordOutput.push(<Placeholder word={word} key={index} />)
            } else {
              const className = `word-component${word.input ? ' highlighted' : ''} ${categories} ${word.fallthrough ? 'fallthrough' : ''} ${word.decorator ? 'decorator' : ''}`
              thisWordOutput.push(<div className={className} key={index}>{word.text}</div>)
            }

            if (qualifiers.length) {
              thisWordOutput.push(<div className='qualifiers'>{qualifiers}</div>)
            }

            return thisWordOutput
          })}
        </div>
      )
    })

    const className = `option${(this.props.selected ? ' selected' : '')}`

    const qualifiers = this.props.option.qualifiers
    return (
      <div
        className={className}
        onMouseOver={this.handleMouseMove.bind(this)}
        onClick={this.props.execute}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}>
        <div className='option-text'>
          {this.props.selected && this.props.option.preview
            ? <Preview object={this.props.option.preview} />
            : null}
          <div className='descriptors' ref='descriptors'>{descriptors}</div>
          <div className='words' ref='words'>{words}</div>
          {/*<div className='ellipsis'>{this.props.option.ellipsis ? '…' : ''}</div>*/}
        </div>
        <div className='hint'>{this.props.hint}</div>
      </div>
    )
  }
}
