'use client';

import { JSX, useMemo } from 'react';
import { Page, SitecoreProvider } from '@sitecore-content-sdk/nextjs';
import type { ComponentMap } from '@sitecore-content-sdk/nextjs';
import type { SitecoreConfig } from '@sitecore-content-sdk/nextjs/config';
import { useIsMounted } from '@/hooks/useIsMounted';

type HydrationSafeSitecoreProviderProps = {
  page: Page;
  componentMap: ComponentMap;
  api: SitecoreConfig['api'];
  children: React.ReactNode;
};

/**
 * Sitecore editing chrome (cursor:pointer wrappers, editable fields) must not
 * render until after hydration — server and client can disagree on isEditing.
 */
export function HydrationSafeSitecoreProvider({
  page,
  componentMap,
  api,
  children,
}: HydrationSafeSitecoreProviderProps): JSX.Element {
  const isMounted = useIsMounted();

  const hydrationSafePage = useMemo(() => {
    if (isMounted || !page.mode.isEditing) {
      return page;
    }

    return {
      ...page,
      mode: {
        ...page.mode,
        isEditing: false,
      },
    };
  }, [page, isMounted]);

  return (
    <SitecoreProvider componentMap={componentMap} api={api} page={hydrationSafePage}>
      {children}
    </SitecoreProvider>
  );
}
