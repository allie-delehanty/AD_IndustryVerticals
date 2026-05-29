import { useEffect, useState } from 'react';

/** True after client mount — use to defer browser-only widgets (e.g. Swiper) and avoid hydration mismatches. */
export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
