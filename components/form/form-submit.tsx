'use client';

import { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormSubmitProps extends PropsWithChildren, ButtonProps {}
export default function FormSubmit({
  children,
  disabled,
  className,
  variant = 'primary',
  ...props
}: FormSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      className={cn('', className)}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
}
