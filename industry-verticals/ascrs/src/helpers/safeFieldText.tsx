'use client';

import { Field, Text, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { createElement } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';

type SafeTextProps = {
  field?: Field<string> | TextField | { value?: unknown };
  tag?: keyof HTMLElementTagNameMap;
  className?: string;
};

const getFieldValue = (field?: SafeTextProps['field']): string => {
  if (!field || !('value' in field)) return '';
  const { value } = field;
  if (value == null) return '';
  return typeof value === 'string' ? value : String(value);
};

/**
 * Renders Sitecore text without hydration mismatches.
 * Sitecore `Text` can emit different wrapper tags on server vs client for the same field.
 */
export function SafeText({ field, tag = 'span', className }: SafeTextProps) {
  const { page } = useSitecore();
  const isMounted = useIsMounted();
  const isEditing = isMounted && page.mode.isEditing;

  if (isEditing) {
    return <Text field={field as Field<string>} tag={tag} className={className} />;
  }

  return createElement(tag, { className }, getFieldValue(field));
}
