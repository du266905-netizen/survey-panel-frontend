import { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MessageContext = createContext('assistant');

export const Message = ({ className, from = 'assistant', children, ...props }) => (
  <MessageContext.Provider value={from}>
    <div
      className={cn(
        'flex w-full flex-col gap-2',
        from === 'user' ? 'items-end' : 'items-start',
        className,
      )}
      data-from={from}
      {...props}
    >
      {children}
    </div>
  </MessageContext.Provider>
);

export const MessageContent = ({ children, className, ...props }) => {
  const from = useContext(MessageContext);
  return (
    <div
      className={cn(
        'flex min-w-0 max-w-full flex-col gap-2 overflow-hidden',
        from === 'user'
          ? 'max-w-[85%] rounded-xl bg-secondary px-4 py-3 text-secondary-foreground'
          : 'text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const MessageActions = ({ className, children, ...props }) => (
  <div className={cn('flex items-center gap-1', className)} {...props}>
    {children}
  </div>
);

export const MessageAction = ({ tooltip, children, label, variant = 'ghost', size = 'icon', ...props }) => {
  const button = (
    <Button size={size} type="button" variant={variant} {...props}>
      {children}
      <span className="sr-only">{label || tooltip}</span>
    </Button>
  );

  if (!tooltip) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const MessageAvatar = ({ className, children, ...props }) => (
  <div className={cn('flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary', className)} {...props}>
    {children}
  </div>
);
