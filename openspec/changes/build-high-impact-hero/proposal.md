## Why

Saigon 45 needs a first viewport that immediately communicates the restaurant offer, location, opening hours, and next actions. The current frontpage hero does not yet match the approved Figma direction for a high-impact food-led landing experience.

## What Changes

- Add a responsive frontpage hero matching the linked Figma section and reference screenshot.
- Use the approved Danish copy for the address, opening hours, headline, supporting text, and CTAs.
- Present a full-bleed food background image with an overlay treatment that keeps the copy readable.
- Add two prominent CTAs: `Bestil nu` first and `Se menu` second.
- Wire CTAs to existing order/menu destinations when available, or leave clear implementation placeholders when no matching route exists.

## Capabilities

### New Capabilities

- `frontpage-hero`: Defines the visual, content, CTA, and responsive behavior for the Saigon 45 frontpage hero.

### Modified Capabilities

No existing capabilities are modified.

## Impact

- Frontend route rendering for the homepage.
- Existing hero component, CMS hero configuration, seed content, or page data used to render the frontpage.
- Styling for desktop and mobile hero layout, background media, overlays, text, and CTA presentation.
- Possible CTA route references for order and menu destinations.
