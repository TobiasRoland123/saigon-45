import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

const isVideoResource = (resource: Props['resource']) =>
  typeof resource === 'object' && resource?.mimeType?.includes('video')

const getWrapperProps = (htmlElement: Props['htmlElement'], className: Props['className']) =>
  htmlElement !== null ? { className } : {}

const renderMedia = (props: Props) =>
  isVideoResource(props.resource) ? <VideoMedia {...props} /> : <ImageMedia {...props} />

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div' } = props

  const Tag = htmlElement || Fragment

  return <Tag {...getWrapperProps(htmlElement, className)}>{renderMedia(props)}</Tag>
}
