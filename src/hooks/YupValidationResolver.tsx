import { useCallback } from 'react';
import { FieldValues, Resolver } from 'react-hook-form';
import * as yup from 'yup';

export const useYupValidationResolver = <T extends FieldValues>(
  validationSchema: yup.SchemaOf<T>,
): Resolver<T, any> => {
  return useCallback(
    async (data: T) => {
      try {
        return {
          values: await validationSchema.validate(data, {
            abortEarly: false,
          }),
          errors: {},
        };
      } catch (errors) {
        const { inner } = errors as { inner: yup.ValidationError[] };
        return {
          values: {},
          errors: inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path || 'extras']: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );
};
