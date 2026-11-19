import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Suggestions = ({ className, children, ...props }) => (
  <ScrollArea className="w-full overflow-x-auto whitespace-nowrap" {...props}>
    <div className={cn('flex w-max flex-nowrap items-center gap-2', className)}>{children}</div>
    <ScrollBar className="hidden" orientation="horizontal" />
  </ScrollArea>
);

export const Suggestion = ({ suggestion, onClick, className, variant = 'outline', size = 'sm', children, ...props }) => (
  <Button
    className={cn('ai-ui cursor-pointer rounded-full px-4', className)}
    onClick={() => onClick?.(suggestion)}
    size={size}
    type="button"
    variant={variant}
    {...props}
  >
    {children || suggestion}
  </Button>
);
