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

  // Contract: callers must supply a non-empty `alt` for interactive SVGs. The
  // helper keeps button semantics here but cannot invent a name, so this input
  // yields a nameless control. Making `onClick` render a keyboard-operable,
  // name-required native <button> is tracked as a follow-up.
  it('keeps button semantics for an interactive SVG but cannot name it without alt', () => {
    expect(getInlineSvgA11yProps({ alt: '', interactive: true })).toEqual({
      role: 'button',
      'aria-label': '',
    })
  })
})
