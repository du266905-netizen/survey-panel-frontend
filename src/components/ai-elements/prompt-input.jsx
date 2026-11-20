import { ArrowUpIcon, PaperclipIcon, SquareIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const PromptInput = ({ className, children, onSubmit, ...props }) => (
  <form
    className={cn('w-full rounded-xl border border-border bg-background shadow-sm', className)}
    onSubmit={onSubmit}
    {...props}
  >
    {children}
  </form>
);

export const PromptInputHeader = ({ className, children, ...props }) => (
  <div className={cn('flex flex-wrap items-center gap-2 border-b border-border p-2', className)} {...props}>
    {children}
  </div>
);

export const PromptInputBody = ({ className, children, ...props }) => (
  <div className={cn('p-2', className)} {...props}>
    {children}
  </div>
);

export const PromptInputTextarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      'ai-prose min-h-[46px] w-full resize-none border-0 bg-transparent px-1 py-1 outline-none placeholder:text-muted-foreground',
      className,
    )}
    rows={2}
    {...props}
  />
);

export const PromptInputFooter = ({ className, children, ...props }) => (
  <div className={cn('flex items-center justify-between gap-2 px-2 pb-2', className)} {...props}>
    {children}
  </div>
);

export const PromptInputTools = ({ className, children, ...props }) => (
  <div className={cn('flex items-center gap-1', className)} {...props}>
    {children}
  </div>
);

export const PromptInputButton = ({ className, tooltip, children, ...props }) => (
  <Button
    className={cn('ai-ui h-8 gap-1.5 rounded-lg px-2.5 text-muted-foreground', className)}
    size="sm"
    type="button"
    variant="ghost"
    title={tooltip}
    {...props}
  >
    {children}
  </Button>
);

export const PromptInputSubmit = ({ className, status = 'ready', onStop, ...props }) => {
  const busy = status === 'submitted' || status === 'streaming';
  return (
    <Button
      aria-label={busy ? '停止' : '发送'}
      className={cn('size-8 rounded-lg', className)}
      onClick={busy ? onStop : undefined}
      size="icon"
      type={busy ? 'button' : 'submit'}
      {...props}
    >
      {busy ? <SquareIcon className="size-3.5" /> : <ArrowUpIcon className="size-4" />}
    </Button>
  );
};

export const PromptInputAttachment = ({ className, name, onRemove, ...props }) => (
  <span
    className={cn('ai-ui inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1', className)}
    {...props}
  >
    <PaperclipIcon className="size-3.5 text-muted-foreground" />
    <span className="max-w-[180px] truncate">{name}</span>
    {onRemove && (
      <button className="text-muted-foreground hover:text-foreground" onClick={onRemove} type="button" aria-label={`移除 ${name}`}>
        <XIcon className="size-3.5" />
      </button>
    )}
  </span>
);
