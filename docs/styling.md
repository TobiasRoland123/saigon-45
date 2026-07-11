# Styling Utilities

Use the shared `cn` utility from `@/utilities/ui` when composing conditional or dynamic Tailwind classes.

```tsx
className={cn('size-2.5 fill-current', isMuted && 'opacity-30')}
```

This keeps conditional class composition consistent and lets `tailwind-merge` resolve conflicting utility classes.
