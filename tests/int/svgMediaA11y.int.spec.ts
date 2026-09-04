import { describe, expect, it, vi } from 'vitest'

import { getInlineSvgA11yProps, warnIfUnnamedInteractive } from '@/components/Media/SvgMedia/a11y'

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

describe('warnIfUnnamedInteractive', () => {
  it('warns when an interactive SVG has no accessible name', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    warnIfUnnamedInteractive({ alt: '', interactive: true })

    expect(spy).toHaveBeenCalledOnce()
    spy.mockRestore()
  })

  it('stays quiet for a named interactive SVG', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    warnIfUnnamedInteractive({ alt: 'Open menu', interactive: true })

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  it('stays quiet for a decorative, non-interactive SVG', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    warnIfUnnamedInteractive({ alt: '', interactive: false })

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })
})
