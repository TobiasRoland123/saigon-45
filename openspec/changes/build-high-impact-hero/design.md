## Context

The homepage route delegates to the shared page template, which renders Payload page data and its hero through `RenderHero`. The current seeded homepage still uses the default Payload website template copy and generic CTAs, while issue #1 asks for a Saigon 45-specific first viewport based on the linked Figma section and reference screenshot.

The existing hero model already supports a `highImpact` variant with rich text, up to two links, and required media. This change should restyle that existing shared `highImpact` hero instead of creating a separate homepage-only component.

## Goals / Non-Goals

**Goals:**

- Match the Figma hero direction on desktop and mobile using the existing frontend stack.
- Render the exact Danish copy from the issue for the info pill, headline, body, and CTA labels.
- Use a full-bleed food background with overlay treatment that preserves text contrast.
- Keep the layout responsive and avoid text, pill, and CTA overlap on narrow screens.
- Keep CTA destinations editable in Payload CMS so the site owner can fill in final order and menu links.

**Non-Goals:**

- Add a full ordering flow, menu page, cart, or payment integration.
- Redesign global navigation, footer, or non-hero homepage sections.
- Introduce a new CMS architecture or external design dependency.
- Replace the existing Payload page rendering model.

## Decisions

1. Restyle the existing `highImpact` hero rendering path.

   The hero schema already supports media, rich text, and two links, and the homepage already renders the hero before layout blocks. Restyling this shared variant keeps the change aligned with the current CMS model and avoids a parallel hard-coded homepage experience. The alternative was to build a bespoke homepage-only hero directly in `src/app/(frontend)/page.tsx`, but that would bypass existing CMS preview, seed, and page fallback behavior.

2. Add structured hero info fields for the pill content.

   The address and opening hours should be modeled as structured CMS data, such as `infoItems` or `eyebrowItems`, instead of being embedded in rich text or hard-coded in the component. For example, the CMS can store `Rødovre Centrum 41` and `Åben: 10:00 - 20:00` as separate pill items while the component controls their visual grouping. This requires Payload schema and generated type updates, but it gives editors ownership of the content and keeps styling reliable.

3. Keep CTA links data-driven and editor-owned.

   The hero should continue using Payload link data for `Bestil nu` and `Se menu`. Implementation should not invent final order or menu destinations; those links should remain editable in Payload CMS for the site owner to fill in. Seed content may include temporary values only as CMS data, not as route assumptions baked into component logic.

4. Use the project visual language and icon system where applicable.

   Styling should follow the local design direction: Plus Jakarta Sans, mint/teal and peach accents, roomy spacing, and readable foreground contrast over image media. If icons are used for location or opening hours, they should come from the shared lucide-backed icon registry instead of ad hoc SVGs.

## Risks / Trade-offs

- Figma details may not be fully available locally -> Use the issue copy, screenshot description, and linked Figma section as the contract; verify visually once implementation starts.
- CMS schema changes require type updates -> Run the project type generation flow after adding structured hero fields.
- Missing order/menu destinations -> Keep CTA wiring data-driven and editable in Payload CMS rather than encoding route assumptions in the component.
- Background image may reduce readability on some crops -> Use a layered overlay and responsive focal/crop rules, then verify on desktop and mobile.
- Restyling `highImpact` affects any page using that hero type -> Treat the new design as the shared high-impact contract and keep restaurant-specific content in CMS data.
