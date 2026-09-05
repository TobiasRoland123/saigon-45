import { describe, expect, it, vi } from 'vitest'

import { getInlineSvgA11yProps, resolveInteractiveName } from '@/components/Media/SvgMedia/a11y'

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

  // The interactive case is rendered inside a native <button>/<a> that carries the
  // accessible name, so the graphic itself must stay silent — otherwise the name is
  // announced twice.
  it('hides the graphic when it is wrapped in an interactive control', () => {
    expect(getInlineSvgA11yProps({ alt: 'Open menu', interactive: true })).toEqual({
      'aria-hidden': true,
    })
  })
})

describe('resolveInteractiveName', () => {
  it('returns null when no control was requested', () => {
    expect(resolveInteractiveName({ alt: 'Company logo', requested: false })).toBeNull()
  })

  it('returns the name when a control was requested and named', () => {
    expect(resolveInteractiveName({ alt: 'Open menu', requested: true })).toBe('Open menu')
  })

  it('trims the name so it is not padded in the accessibility tree', () => {
    expect(resolveInteractiveName({ alt: '  Open menu  ', requested: true })).toBe('Open menu')
  })

  // Fails closed in every environment: a nameless control is a WCAG 4.1.2 failure, so
  // the caller falls back to a static graphic rather than rendering one.
  it.each([
    ['empty', ''],
    ['whitespace-only', '   '],
  ])('refuses a %s name and reports why', (_label, alt) => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(resolveInteractiveName({ alt, requested: true })).toBeNull()
    expect(spy).toHaveBeenCalledOnce()

    spy.mockRestore()
  })

  it('stays quiet for a decorative, non-interactive SVG', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(resolveInteractiveName({ alt: '', requested: false })).toBeNull()

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })
})
