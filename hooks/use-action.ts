import { useState, useCallback } from 'react';

import { ActionState, FieldError } from '@/lib/create-safe-action';

type Action<TIn, TOut> = (data: TIn) => Promise<ActionState<TIn, TOut>>;

interface UseActionOptions<TOut> {
  onSuccess?: (data: TOut) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TIn, TOut>(
  action: Action<TIn, TOut>,
  options: UseActionOptions<TOut> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldError<TIn> | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOut | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (input: TIn) => {
      setLoading(true);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }
        setFieldErrors(result.fieldErrors);
        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }
        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    data,
    error,
    execute,
    loading,
    fieldErrors,
  };
};
