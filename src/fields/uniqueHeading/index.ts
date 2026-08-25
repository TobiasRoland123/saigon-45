import type { TextField, Validate } from 'payload'

import { toAnchorId } from '@/utilities/toAnchorId'

type LayoutBlock = {
  blockType?: string
  heading?: unknown
}

/**
 * Validates that a block heading is unique across all blocks on the page.
 *
 * Note: `unique: true` cannot be used for this. On a field nested in a `blocks`
 * field, Payload turns it into a collection-wide unique index on the dotted path
 * (`layout.heading`), which would stop two different pages from ever sharing a
 * heading. Uniqueness within a single document has to be validated by hand.
 *
 * Headings are compared as anchor ids, so "Bubble Tea" and "bubble tea" count as
 * a clash — they would render the same `id` and break `#anchor` links.
 *
 * Only top-level `layout` blocks are compared; headings nested deeper inside a
 * block (e.g. BubbleTea's per-section headings) are not rendered as page anchors.
 */
const validateUniqueHeading: Validate<string, unknown, LayoutBlock> = (value, { data, path }) => {
  if (!value) return true

  const layout = (data as { layout?: LayoutBlock[] } | undefined)?.layout
  if (!Array.isArray(layout)) return true

  const anchorId = toAnchorId(value)
  if (!anchorId) return `"${value}" cannot be turned into a link anchor. Use letters or numbers.`

  // `siblingData` is a merged copy, so it cannot be identity-compared against the
  // entry in `layout`. The field path (`layout.<index>.heading`) gives the row.
  const ownIndex = path?.[path.length - 2]

  const clashes = layout.filter(
    (block, index) =>
      index !== Number(ownIndex) &&
      typeof block?.heading === 'string' &&
      toAnchorId(block.heading) === anchorId,
  )

  if (clashes.length) {
    return `Heading must be unique on this page — "${value}" already links to #${anchorId}.`
  }

  return true
}

/**
 * A block heading that doubles as the section's `#anchor` link target.
 * Spread this into a block's fields and override `defaultValue` as needed.
 */
export const uniqueHeadingField: TextField = {
  name: 'heading',
  type: 'text',
  admin: {
    components: {
      // Renders this description, plus the live anchor id with a copy button.
      Description: '@/fields/uniqueHeading/AnchorIdDescription#AnchorIdDescription',
    },
    description: "Must be unique on the page — it becomes the section's #anchor link target.",
  },
  required: true,
  validate: validateUniqueHeading,
}
