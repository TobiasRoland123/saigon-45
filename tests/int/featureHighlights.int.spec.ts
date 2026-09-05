import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { FeatureHighlightsBlock } from '@/blocks/FeatureHighlights/Component'
import type {
  FeatureHighlightsBlock as FeatureHighlightsBlockProps,
  Page,
  Post,
} from '@/payload-types'

type HighlightItem = FeatureHighlightsBlockProps['items'][number]

const item = (overrides: Partial<HighlightItem> = {}): HighlightItem => ({
  id: 'highlight-1',
  icon: 'star',
  title: 'Fresh ingredients',
  subtitle: 'Made every day',
  ...overrides,
})

const renderBlock = (...items: HighlightItem[]) =>
  renderToStaticMarkup(
    React.createElement(FeatureHighlightsBlock, {
      blockType: 'featureHighlights',
      items,
    }),
  )

const linksIn = (markup: string) => {
  const container = document.createElement('div')
  container.innerHTML = markup
  return Array.from(container.querySelectorAll('a'))
}

describe('FeatureHighlightsBlock links', () => {
  it('keeps legacy items visible without anchors', () => {
    const markup = renderBlock(item())

    expect(markup).toContain('Fresh ingredients')
    expect(markup).toContain('Made every day')
    expect(linksIn(markup)).toHaveLength(0)
  })

  it('keeps a disabled item plain even when a destination is stored', () => {
    const markup = renderBlock(
      item({
        enableLink: false,
        link: { type: 'custom', url: 'https://example.com/stored' },
      }),
    )

    expect(markup).toContain('Fresh ingredients')
    expect(linksIn(markup)).toHaveLength(0)
    expect(markup).not.toContain('example.com/stored')
  })

  it('wraps the complete item in a custom link and supports opening it in a new tab', () => {
    const markup = renderBlock(
      item({
        enableLink: true,
        link: { type: 'custom', url: 'https://example.com/menu', newTab: true },
      }),
    )
    const links = linksIn(markup)

    expect(links).toHaveLength(1)
    expect(links[0]?.getAttribute('href')).toBe('https://example.com/menu')
    expect(links[0]?.getAttribute('target')).toBe('_blank')
    expect(links[0]?.getAttribute('rel')).toBe('noopener noreferrer')
    expect(links[0]?.textContent).toContain('Fresh ingredients')
    expect(links[0]?.textContent).toContain('Made every day')
    expect(links[0].querySelector('svg')).not.toBeNull()
  })

  it('resolves page and post references through CMSLink', () => {
    const markup = renderBlock(
      item({
        id: 'page-highlight',
        title: 'Visit our bakery',
        enableLink: true,
        link: {
          type: 'reference',
          reference: { relationTo: 'pages', value: { slug: 'bakery' } as Page },
        },
      }),
      item({
        id: 'post-highlight',
        title: 'Read our story',
        enableLink: true,
        link: {
          type: 'reference',
          reference: { relationTo: 'posts', value: { slug: 'our-story' } as Post },
        },
      }),
    )
    const links = linksIn(markup)

    expect(links).toHaveLength(2)
    expect(links[0]?.getAttribute('href')).toBe('/bakery')
    expect(links[1]?.getAttribute('href')).toBe('/posts/our-story')
  })

  it('keeps content visible without an anchor when a destination is missing or unresolved', () => {
    const markup = renderBlock(
      item({
        id: 'missing-url',
        title: 'Missing URL',
        enableLink: true,
        link: { type: 'custom', url: null },
      }),
      item({
        id: 'unresolved-reference',
        title: 'Unresolved reference',
        enableLink: true,
        link: {
          type: 'reference',
          reference: { relationTo: 'pages', value: 999 },
        },
      }),
    )

    expect(markup).toContain('Missing URL')
    expect(markup).toContain('Unresolved reference')
    expect(linksIn(markup)).toHaveLength(0)
  })
})
