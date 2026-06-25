# Icon Strategy

Saigon 45 uses a controlled icon registry backed by `lucide-react`.

Editors select icons through Payload `select` fields. Frontend components receive the stored icon key and render it through the shared `Icon` component.

## Architecture

- `src/icons/registry.ts` owns the approved icon list, editor labels, and TypeScript icon names.
- `src/icons/Icon.tsx` renders icons consistently.
- `src/fields/icon.ts` creates reusable Payload icon select fields from the same registry.

Example registry entry:

```ts
export const iconRegistry = {
  mapPin: {
    label: 'Map pin',
    Icon: MapPin,
  },
}
```

Example CMS field:

```ts
import { icon } from '@/fields/icon'

icon({ required: true })
```

Example frontend render:

```tsx
import { Icon } from '@/icons'

<Icon name="mapPin" className="size-6 text-primary" />
```

## Naming

Use camelCase keys that describe the visual icon, for example `mapPin`, `phone`, and `clock`.

Do not rename existing keys after content has been saved in Payload. Add a new key and migrate old content if a rename is required.

## Accessibility

Icons are decorative by default:

```tsx
<Icon name="phone" />
```

When an icon communicates meaning without nearby visible text, provide a label:

```tsx
<Icon name="phone" label="Phone number" />
```

## Adding Icons

1. Import the Lucide icon in `src/icons/registry.ts`.
2. Add it to `iconRegistry` with a stable camelCase key and editor-friendly label.
3. Use `icon()` from `src/fields/icon.ts` in block or collection configs.
4. Run `pnpm generate:types` after adding icon fields to Payload schemas.

