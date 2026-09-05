import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SvgMedia } from '@/components/Media/SvgMedia'

/**
 * Keyboard operability is provided by rendering *native* `<button>`/`<a>` elements:
 * they are focusable and activate on Enter/Space without any `tabIndex` or
 * `onKeyDown` of our own. jsdom does not implement default keyboard activation, so
 * these tests assert the element type and its accessible name rather than
 * simulating a keypress — the native element is the guarantee.
 */

const SVG_URL = '/api/media/file/icon.svg'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('SvgMedia — non-interactive (unchanged behaviour)', () => {
  it('renders a plain labelled <img> when no handler is given', () => {
    render(<SvgMedia altOverride="Company logo" url={SVG_URL} />)

    const img = screen.getByAltText('Company logo')
    expect(img.tagName).toBe('IMG')
    expect(img.getAttribute('src')).toBe(SVG_URL)
    expect(img.closest('button')).toBeNull()
  })

  it('renders nothing without a url', () => {
    const { container } = render(<SvgMedia altOverride="Company logo" />)

    expect(container.firstChild).toBeNull()
  })
})

describe('SvgMedia — interactive, mode="img"', () => {
  it('renders a native button named by altOverride', async () => {
    const onClick = vi.fn()
    render(<SvgMedia altOverride="Open menu" onClick={onClick} url={SVG_URL} />)

    const button = screen.getByRole('button', { name: 'Open menu' })
    expect(button.tagName).toBe('BUTTON')
    expect(button.getAttribute('type')).toBe('button')

    button.focus()
    expect(document.activeElement).toBe(button)

    button.click()
    await waitFor(() => expect(onClick).toHaveBeenCalledOnce())
  })

  it('hides the graphic from assistive tech so the name is not announced twice', () => {
    render(<SvgMedia altOverride="Open menu" onClick={vi.fn()} url={SVG_URL} />)

    const img = screen.getByRole('button', { name: 'Open menu' }).querySelector('img')
    expect(img?.getAttribute('alt')).toBe('')
  })

  it('renders an anchor when href is given', () => {
    render(<SvgMedia altOverride="Go home" href="/" url={SVG_URL} />)

    const link = screen.getByRole('link', { name: 'Go home' })
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe('/')
  })

  it('puts className on the control and imgClassName on the graphic', () => {
    render(
      <SvgMedia
        altOverride="Open menu"
        className="control"
        imgClassName="graphic"
        onClick={vi.fn()}
        url={SVG_URL}
      />,
    )

    const button = screen.getByRole('button', { name: 'Open menu' })
    expect(button.className).toBe('control')
    expect(button.querySelector('img')?.className).toBe('graphic')
  })

  // The typed union forces callers to pass `altOverride`, but it cannot stop a blank
  // string — which is exactly what a blank `alt` on a Media record yields. Rather than
  // ship a nameless control, the component degrades to a static graphic.
  it.each([
    ['empty', ''],
    ['whitespace-only', '   '],
  ])('degrades to a static graphic when the name is %s', (_name, altOverride) => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<SvgMedia altOverride={altOverride} onClick={vi.fn()} url={SVG_URL} />)

    expect(screen.queryByRole('button')).toBeNull()
    expect(document.querySelector('img')).not.toBeNull()
    expect(spy).toHaveBeenCalled()
  })

  it('trims the accessible name', () => {
    render(<SvgMedia altOverride="  Open menu  " onClick={vi.fn()} url={SVG_URL} />)

    expect(screen.getByRole('button', { name: 'Open menu' })).toBeDefined()
  })
})

describe('SvgMedia — interactive, mode="inline"', () => {
  it('wraps the injected SVG in the same named button', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('<svg viewBox="0 0 1 1"><circle r="1" /></svg>'),
      }),
    )

    const onClick = vi.fn()
    render(<SvgMedia altOverride="Open menu" mode="inline" onClick={onClick} url={SVG_URL} />)

    const button = await screen.findByRole('button', { name: 'Open menu' })
    expect(button.tagName).toBe('BUTTON')
    expect(button.querySelector('svg')).not.toBeNull()

    button.click()
    await waitFor(() => expect(onClick).toHaveBeenCalledOnce())
  })

  it('exposes a static inline SVG as a labelled image, not a control', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('<svg viewBox="0 0 1 1"><circle r="1" /></svg>'),
      }),
    )

    render(<SvgMedia altOverride="Company logo" mode="inline" url={SVG_URL} />)

    const graphic = await screen.findByRole('img', { name: 'Company logo' })
    expect(screen.queryByRole('button')).toBeNull()
    expect(graphic.querySelector('svg')).not.toBeNull()
  })
})
