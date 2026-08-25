'use client'

import type { TextFieldDescriptionClientComponent } from 'payload'

import { toAnchorId } from '@/utilities/toAnchorId'
import { CopyToClipboard, useField } from '@payloadcms/ui'
import React from 'react'

// Styles are inline rather than Tailwind: the admin runs under the (payload)
// route group, whose layout imports Payload's own CSS but not globals.css, so no
// Tailwind utilities are generated for this tree. The custom properties below
// are Payload's, so the chip follows the admin's light/dark theme.
const currentIdStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem',
  margin: '0.25rem 0 0',
}

const codeStyle: React.CSSProperties = {
  background: 'var(--theme-elevation-100)',
  borderRadius: '3px',
  fontFamily: 'var(--font-mono)',
  padding: '0 0.25rem',
}

/**
 * The heading field's description, plus the anchor id the heading will produce,
 * live as the editor types, with a copy button so the fragment can be pasted
 * straight into a link.
 */
export const AnchorIdDescription: TextFieldDescriptionClientComponent = ({ description, path }) => {
  const { value } = useField<string>({ path })

  // `description` is whatever the field config set, so per-block overrides
  // (including translated ones) still show through.
  const text = typeof description === 'string' ? description : undefined
  const anchorId = toAnchorId(value)

  return (
    <div className="field-description">
      {text ? <p style={{ margin: 0 }}>{text}</p> : null}
      <p style={currentIdStyle}>
        {anchorId ? (
          <React.Fragment>
            Current ID to use as reference when linking: <code style={codeStyle}>#{anchorId}</code>
            <CopyToClipboard
              defaultMessage="Copy ID"
              successMessage="ID copied"
              value={`#${anchorId}`}
            />
          </React.Fragment>
        ) : (
          <em>
            Heading is required and generate a reference ID to use in anchor links — add letters or
            numbers to the heading.
          </em>
        )}
      </p>
    </div>
  )
}
