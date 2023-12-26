'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import FormErrors from './form-errors';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errors?: Record<string, string[] | undefined>;
  defaultValue?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { errors, label, defaultValue = '', id, className, disabled, ...props },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}

          <Input
            ref={ref}
            name={id}
            defaultValue={defaultValue}
            disabled={pending || disabled}
            aria-describedby={`${id}-error`}
            className={cn('text-sm px-2 py-1 h-7', className)}
            {...props}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
