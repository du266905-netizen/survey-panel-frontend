import { ArrowDownIcon } from 'lucide-react';
import { useCallback } from 'react';
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Conversation = ({ className, ...props }) => (
  <StickToBottom
    className={cn('relative flex-1 overflow-y-hidden', className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export const ConversationContent = ({ className, ...props }) => (
  <StickToBottom.Content className={cn('flex flex-col gap-6 p-4', className)} {...props} />
);

export const ConversationEmptyState = ({
  className,
  title = '还没有对话',
  description = '说一句研究目标，从这里开始',
  icon,
  children,
  ...props
}) => (
  <div className={cn('flex size-full flex-col items-center justify-center gap-3 p-8 text-center', className)} {...props}>
    {children ?? (
      <>
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <div className="space-y-1">
          <h3 className="ai-title">{title}</h3>
          {description && <p className="ai-prose text-muted-foreground">{description}</p>}
        </div>
      </>
    )}
  </div>
);

export const ConversationScrollButton = ({ className, ...props }) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();
  const handleScrollToBottom = useCallback(() => scrollToBottom(), [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={cn('absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full', className)}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className="size-4" />
      </Button>
    )
  );
};
