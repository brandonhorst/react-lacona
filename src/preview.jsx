import _ from 'lodash'
import React from 'react'
import {renderToString} from 'katex'

export default function Preview (props) {
  let preview
  if (props.object.type === 'text') {
    preview = (
        <div className='preview preview-text'>
          {props.object.value}
        </div>
    )
  } else if (props.object.type === 'html') {
    preview = <div 
      className='preview preview-html'
      dangerouslySetInnerHTML={{__html: props.object.value}} />
  } else if (props.object.type === 'tex') {
    const values = _.isArray(props.object.value)
      ? props.object.value
      : [props.object.value]
    const htmls = _.map(values, value => renderToString(value))
    preview = <div
      className='preview preview-tex'
      dangerouslySetInnerHTML={{__html: htmls.join(' ')}} />
  }

  if (preview) {
    return <div className='preview-wrapper'>{preview}</div>
  }
}
