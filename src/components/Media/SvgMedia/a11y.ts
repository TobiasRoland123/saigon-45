import type { AriaRole } from 'react'

type InlineSvgA11yProps = { 'aria-hidden': true } | { role: AriaRole; 'aria-label': string }

/**
 * Resolves the accessibility props for an inline (DOM-injected) SVG wrapper.
 *
 * Three cases, because a role-less `<div aria-label>` is a prohibited-ARIA
 * violation and a `role="img"` with an empty name is announced as a useless
 * "unlabelled image":
 *
 * - interactive → decorative: the surrounding native `<button>`/`<a>` carries the
 *   accessible name, so the graphic itself must not be announced a second time
 * - non-interactive with alt text → `img` named by `alt`
 * - non-interactive without alt text → decorative: hidden from assistive tech,
 *   with no role so it is never announced
 */
export const getInlineSvgA11yProps = ({
  alt,
  interactive,
}: {
  alt: string
  interactive: boolean
}): InlineSvgA11yProps => {
  if (interactive) return { 'aria-hidden': true }
  if (alt !== '') return { role: 'img', 'aria-label': alt }
  return { 'aria-hidden': true }
}

/**
 * Dev-only guard for the interactive case: a `<button>` whose only content is a
 * graphic has no visible text, so without `altOverride` it is announced as a bare
 * "button". TypeScript already requires `altOverride` alongside `onClick`/`href`,
 * but it cannot see that the value came from a Media record an editor left blank.
 */
export const warnIfUnnamedInteractive = ({
  alt,
  interactive,
}: {
  alt: string
  interactive: boolean
}): void => {
  if (process.env.NODE_ENV === 'production') return
  if (!interactive || alt !== '') return

  console.error(
    '[SvgMedia] A clickable SvgMedia has no accessible name. Pass a non-empty `altOverride`, ' +
      'or set the `alt` field on the Media record.',
  )
}
