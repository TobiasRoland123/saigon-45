---
name: Mint & Stone
colors:
  surface: '#e9fef8'
  surface-dim: '#caded9'
  surface-bright: '#e9fef8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e3f8f3'
  surface-container: '#ddf2ed'
  surface-container-high: '#d8ede7'
  surface-container-highest: '#d2e7e2'
  on-surface: '#0c1f1c'
  on-surface-variant: '#404945'
  inverse-surface: '#223430'
  inverse-on-surface: '#e0f5f0'
  outline: '#707975'
  outline-variant: '#bfc9c4'
  surface-tint: '#2f685a'
  primary: '#2f685a'
  on-primary: '#ffffff'
  primary-container: '#78b1a0'
  on-primary-container: '#004437'
  inverse-primary: '#98d2c0'
  secondary: '#8e4e14'
  on-secondary: '#ffffff'
  secondary-container: '#ffab69'
  on-secondary-container: '#783d01'
  tertiary: '#426464'
  on-tertiary: '#ffffff'
  tertiary-container: '#89acac'
  on-tertiary-container: '#1e4141'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b4efdc'
  primary-fixed-dim: '#98d2c0'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#125042'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#ffb780'
  on-secondary-fixed: '#2f1400'
  on-secondary-fixed-variant: '#6f3800'
  tertiary-fixed: '#c5eae9'
  tertiary-fixed-dim: '#a9cdcd'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#2a4c4c'
  background: '#e9fef8'
  on-background: '#0c1f1c'
  surface-variant: '#d2e7e2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1200px
  gutter: 20px
---

## Brand & Style

The design system is built for an audience that values freshness, modern Vietnamese street culture, and high-energy social spaces. The personality is "Playful-Sophisticated"—combining the organic, refreshing nature of herbal tea with the clean, structured aesthetic of a modern urban café.

The visual style is **Soft Minimalist** with a **Tactile** edge. It avoids the rigidity of corporate design in favor of airy whitespace, gentle transitions, and organic shapes. The emotional response should be a sense of cooling relief and approachable luxury, much like the experience of walking into a climate-controlled, herb-scented tea shop on a humid Saigon afternoon.

## Colors

The palette is anchored by the **Soft Teal/Mint (#78B1A0)**, representing fresh tea leaves and herbal vitality. This serves as the primary brand identifier for high-action elements. **Peach (#F4A261)** provides a warm, energetic contrast for notifications, special offers, and accents, mimicking the sweetness of bubble tea toppings.

The background uses **Very Light Mint (#F0F7F4)** instead of pure white to maintain the thematic "coolness" and reduce eye strain. Text and structural elements utilize a deep **Forest Charcoal (#2D4F4F)** to ensure accessibility and grounding against the lighter surface tones.

## Typography

This design system utilizes **Plus Jakarta Sans** exclusively to maintain a contemporary, geometric, and friendly tone. Its high x-height and open counters ensure legibility across both digital menus and mobile interfaces.

- **Headlines:** Use heavy weights (700+) with slightly tighter letter spacing for a punchy, editorial look.
- **Body Text:** Standardized at 16px to 18px with generous line height (1.6) to reflect the "airy" brand personality.
- **Labels:** Semi-bold or Bold weights are used for utility text to provide clear hierarchy without needing large font sizes.

## Layout & Spacing

The layout follows a **Fluid 12-Column Grid** for desktop and a **4-Column Grid** for mobile. Spacing is governed by an 8px rhythmic scale, but emphasizes "Breathable Space"—meaning margins and paddings should lean toward the larger end of the scale (MD and LG) to prevent the UI from feeling cluttered.

**Adaptive Rules:**

- **Mobile:** 16px side margins with 20px gutters. Content is primarily stacked in a single column.
- **Tablet:** 32px side margins. Grid shifts to 2-column card layouts.
- **Desktop:** Centered 1200px container. Elements should utilize asymmetric whitespace to create a modern, "lifestyle magazine" feel.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and **Soft Ambient Shadows**. Rather than heavy drop shadows, the design system uses subtle shifts in background saturation to denote depth.

- **Level 0 (Base):** Very Light Mint (#F0F7F4) surface.
- **Level 1 (Cards/Floating):** Pure White (#FFFFFF) surface with a very soft, diffused shadow (0px 4px 20px rgba(120, 177, 160, 0.12)). The shadow is tinted with the primary teal color to keep it "fresh" rather than "dirty" (grey).
- **Overlays:** Use a 20px backdrop blur (Glassmorphism) with 80% opacity of the surface color to maintain context while focusing on modals or menus.

## Shapes

The shape language is defined by a **16px standard corner radius**, creating a "soft-square" aesthetic that feels friendly but organized.

- **Primary Elements:** Buttons and Input fields use 16px (rounded-lg) for a consistent tactile feel.
- **Containers:** Large cards and sections use 24px (rounded-xl) to emphasize the organic herb/leaf inspiration.
- **Small Accents:** Tags and chips use 8px (rounded-md) to maintain readability while fitting within the rounded system.

## Components

### Buttons

- **Primary:** Solid Soft Teal (#78B1A0) with White text. 16px corners. No border.
- **Secondary:** Solid Peach (#F4A261) with White text. Used for "Add to Cart" or "Order Now."
- **Ghost:** Soft Teal border (2px) with Teal text. Used for less urgent actions.

### Cards

Cards are the primary container. They feature a white background, 24px corner radius, and the primary-tinted ambient shadow. Padding inside cards should be generous (24px or 32px).

### Input Fields

Inputs use a light teal-grey background with a 1px border that turns 2px Soft Teal on focus. Corners are 16px.

### Chips & Tags

Used for drink categories (e.g., "Sugar Free," "Extra Topping"). These use a semi-transparent version of the primary color (10% opacity) with dark teal text and 8px corners.

### Interactive States

Hover states should involve a subtle scale-up (1.02x) and a slight darkening of the background color, reinforcing the "bouncy" and "fresh" nature of the design system.
