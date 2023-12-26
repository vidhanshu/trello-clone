import { XCircle } from 'lucide-react';

interface TFormErrorProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormErrors({ errors, id }: TFormErrorProps) {
  if (!errors) return null;

  return (
    <div
      id={`${id}-error`}
      area-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
      {errors[id]?.map((error, i) => (
        <div
          key={i}
          className="flex items-center font-medium border border-rose-500 p-2 bg-rose-500/10 rounded-sm"
        >
          <XCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
}
