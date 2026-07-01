## ADDED Requirements

### Requirement: Hero content matches approved Saigon 45 copy

The system SHALL render the high-impact hero with the approved Danish content from issue #1 when that content is configured in Payload CMS.

#### Scenario: Frontpage hero copy is shown

- **WHEN** a visitor opens the frontpage
- **THEN** the hero displays the address `Rødovre Centrum 41`, opening hours `Åben: 10:00 - 20:00`, headline `Asiatisk takeaway & bubble tea i Rødovre Centrum`, and supporting copy `Oplev vores frisklavede wokretter, sprøde snacks og det største udvalg af bubble tea. Perfekt til en pause i shoppingen eller en hyggelig aften hjemme.`

### Requirement: Hero info pill is structured CMS data

The system SHALL model the high-impact hero info pill as structured Payload CMS fields rather than hard-coded component text or unstructured rich text.

#### Scenario: Editor configures info items

- **WHEN** an editor configures the high-impact hero in Payload CMS
- **THEN** the editor can provide separate structured values for info items such as address and opening hours

#### Scenario: Structured info items render in the pill

- **WHEN** the high-impact hero has configured info items
- **THEN** the hero renders those items together as the visual info pill

### Requirement: Hero uses readable full-bleed background media

The system SHALL present the high-impact hero over a full-bleed food background image with overlay treatment that maintains text readability.

#### Scenario: Hero background fills first viewport

- **WHEN** the frontpage hero is rendered on a desktop viewport
- **THEN** the background media fills the hero area edge-to-edge and the content remains readable over the image

#### Scenario: Hero remains readable on mobile

- **WHEN** the frontpage hero is rendered on a mobile viewport
- **THEN** the background media, overlay, and content layout keep all hero text readable without overlap

### Requirement: Hero provides primary and secondary actions

The system SHALL render two CMS-managed hero CTAs in the intended order: `Bestil nu` as the primary action and `Se menu` as the secondary action.

#### Scenario: CTAs are displayed in order

- **WHEN** a visitor views the frontpage hero
- **THEN** the hero displays `Bestil nu` before `Se menu`

#### Scenario: CTA destinations are editor-managed

- **WHEN** an editor configures the hero CTAs in Payload CMS
- **THEN** each CTA uses the destination stored in CMS data without hard-coded order or menu route assumptions in the component

### Requirement: Hero layout is responsive and non-overlapping

The system SHALL adapt the high-impact hero layout across desktop and mobile so the content block, info pill, and CTAs remain visible and do not overlap.

#### Scenario: Desktop layout follows Figma direction

- **WHEN** the frontpage hero is rendered on a desktop viewport
- **THEN** the content block is left-aligned within the page container and visually matches the linked Figma section

#### Scenario: Mobile layout stacks safely

- **WHEN** the frontpage hero is rendered on a mobile viewport
- **THEN** the info pill, headline, supporting copy, and CTAs stack within the viewport width without clipping or overlapping
