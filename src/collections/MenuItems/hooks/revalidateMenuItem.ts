import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateMenuItem: CollectionAfterChangeHook = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating menu after updating menu item: ${doc.id}`)
    revalidatePath('/menu')
  }

  return doc
}

export const revalidateMenuItemDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating menu after deleting menu item: ${doc.id}`)
    revalidatePath('/menu')
  }

  return doc
}
