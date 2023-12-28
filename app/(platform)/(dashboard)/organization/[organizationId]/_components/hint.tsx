import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PropsWithChildren } from 'react';

interface HintProps extends PropsWithChildren {
  description: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  sideOffset?: number;
}
const Hint = ({ description, children, side, sideOffset }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent
            sideOffset={sideOffset}
            side={side}
            className="text-xs max-w-[220px] break-words"
          >
            {description}
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
