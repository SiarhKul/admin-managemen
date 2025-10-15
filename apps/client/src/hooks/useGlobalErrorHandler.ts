import { useEffect } from 'react';

export type GlobalErrorMeta = {
  type: 'error' | 'unhandledrejection';
  source?: string;
  lineno?: number;
  colno?: number;
};

export type GlobalErrorHandler = (
  error: unknown,
  meta: GlobalErrorMeta
) => void;

export function useGlobalErrorHandler(onError: GlobalErrorHandler) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      onError?.(event.error ?? event.message, {
        type: 'error',
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
      return false;
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      onError?.(event.reason, { type: 'unhandledrejection' });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [onError]);
}
