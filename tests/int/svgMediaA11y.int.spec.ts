import { describe, expect, it } from 'vitest'

import { getInlineSvgA11yProps } from '@/components/Media/SvgMedia/a11y'

describe('getInlineSvgA11yProps', () => {
  it('hides a decorative SVG (no alt, not interactive) from assistive tech', () => {
    expect(getInlineSvgA11yProps({ alt: '', interactive: false })).toEqual({
      'aria-hidden': true,
    })
  })

  it('exposes a labelled SVG as an image when alt text is present', () => {
    expect(getInlineSvgA11yProps({ alt: 'Company logo', interactive: false })).toEqual({
      role: 'img',
      'aria-label': 'Company logo',
    })
  })

  it('exposes an interactive SVG as a button named by its alt', () => {
    expect(getInlineSvgA11yProps({ alt: 'Open menu', interactive: true })).toEqual({
      role: 'button',
      'aria-label': 'Open menu',
    })
  })

  it('keeps the button role for an interactive SVG even without alt text', () => {
    expect(getInlineSvgA11yProps({ alt: '', interactive: true })).toEqual({
      role: 'button',
      'aria-label': '',
    })
  })
})
