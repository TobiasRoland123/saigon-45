import type { Field, SelectField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { iconOptions } from '@/icons'

type IconFieldType = (options?: {
  name?: string
  label?: string
  required?: boolean
  overrides?: Partial<SelectField>
}) => Field

export const icon: IconFieldType = ({
  label = 'Icon',
  name = 'icon',
  overrides = {},
  required = false,
} = {}) => {
  const iconField: SelectField = {
    name,
    type: 'select',
    admin: {
      description: 'Choose one of the approved project icons.',
    },
    label,
    options: iconOptions,
    required,
  }

  return deepMerge(iconField, overrides)
}

