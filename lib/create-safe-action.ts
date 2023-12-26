import * as z from 'zod';

export type FieldError<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TIn, TOut> = {
  fieldErrors?: FieldError<TIn>;
  error?: string | null;
  data?: TOut;
};

export const createSafeAction = <TIn, TOut>(
  schema: z.Schema<TIn>,
  handler: (validateData: TIn) => Promise<ActionState<TIn, TOut>>
) => {
  return async (data: TIn): Promise<ActionState<TIn, TOut>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldError<TIn>,
      };
    }

    return handler(validationResult.data);
  };
};
