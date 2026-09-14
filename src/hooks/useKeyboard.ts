import { useEffect, useCallback } from 'react';

/**
 * Hook to register global keyboard shortcuts.
 * Example: useKeyboard('k', () => openSearch(), { ctrlKey: true });
 */
export function useKeyboard(
  key: string,
  callback: () => void,
  options: { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean } = {}
) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      const ctrlOk = options.ctrlKey ? e.ctrlKey || e.metaKey : true;
      const shiftOk = options.shiftKey ? e.shiftKey : true;

      if (e.key.toLowerCase() === key.toLowerCase() && ctrlOk && shiftOk) {
        e.preventDefault();
        callback();
      }
    },
    [key, callback, options.ctrlKey, options.metaKey, options.shiftKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
