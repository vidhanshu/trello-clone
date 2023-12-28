'use client';

import { X } from 'lucide-react';
import { ElementRef, PropsWithChildren, useRef } from 'react';
import { toast } from 'sonner';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/actions/create-board';
import { FormInput } from './form-input';
import FormSubmit from './form-submit';
import { Button } from '@/components/ui/button';
import FormPicker from './form-picker';
import { useRouter } from 'next/navigation';

interface FormPopoverProps extends PropsWithChildren {
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'end' | 'center';
  sideOffset?: number;
}
const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success('Board created successfully');
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              errors={fieldErrors}
              id="title"
              label="Board Title"
              type="text"
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
