'use client';

import { useEffect, useMemo } from 'react';
import { Field } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ASCRS_BRAND_CSS_VARS } from '@/constants/ascrsBrand';

interface Fields {
  CustomCSS: Field<string>;
  ThemeDefaults: Field<string>;
  FontOptions: Field<string>;
}

export type ThemeEditorProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const parseCssVariables = (css: string) => {
  const vars: Record<string, string> = {};
  if (!css) return vars;

  const regex = /(--[\w-]+)\s*:\s*([^;]+);?/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    vars[match[1].trim()] = match[2].trim();
  }
  return vars;
};

/** Applies CMS theme tokens on the client — ASCRS brand tokens always win. */
export const Default = (props: ThemeEditorProps): null => {
  const customCssValue = props.fields.CustomCSS?.value || '';
  const themeDefaultsValue = props.fields.ThemeDefaults?.value || '';

  const varMap = useMemo(
    () => ({
      ...parseCssVariables(themeDefaultsValue),
      ...parseCssVariables(customCssValue),
      ...ASCRS_BRAND_CSS_VARS,
    }),
    [customCssValue, themeDefaultsValue]
  );

  useEffect(() => {
    for (const [name, value] of Object.entries(varMap)) {
      document.documentElement.style.setProperty(name, value);
    }
  }, [varMap]);

  return null;
};
