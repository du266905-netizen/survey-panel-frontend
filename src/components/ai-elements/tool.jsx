import { CheckCircleIcon, ChevronDownIcon, CircleIcon, ClockIcon, WrenchIcon, XCircleIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const STATUS = {
  running: { label: '运行中', icon: <ClockIcon className="size-3.5 animate-pulse" /> },
  completed: { label: '完成', icon: <CheckCircleIcon className="size-3.5" /> },
  error: { label: '失败', icon: <XCircleIcon className="size-3.5" /> },
  pending: { label: '等待', icon: <CircleIcon className="size-3.5" /> },
};

export const Tool = ({ className, ...props }) => (
  <Collapsible className={cn('not-prose mb-4 w-full rounded-md border border-border', className)} {...props} />
);

export const ToolHeader = ({ className, title, state = 'pending', ...props }) => {
  const status = STATUS[state] || STATUS.pending;
  return (
    <CollapsibleTrigger className={cn('group flex w-full items-center justify-between gap-4 p-3', className)} {...props}>
      <div className="flex items-center gap-2">
        <WrenchIcon className="size-4 text-muted-foreground" />
        <span className="ai-ui">{title || '工具调用'}</span>
        <Badge className="gap-1.5 rounded-full" variant="secondary">
          {status.icon}
          {status.label}
        </Badge>
      </div>
      <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
  );
};

export const ToolContent = ({ className, ...props }) => (
  <CollapsibleContent
    className={cn(
      'text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
);

export const ToolInput = ({ className, input, ...props }) => (
  <div className={cn('space-y-2 overflow-hidden p-4', className)} {...props}>
    <h4 className="ai-meta">参数</h4>
    <pre className="ai-code overflow-x-auto rounded-md bg-muted/50 p-3">{JSON.stringify(input, null, 2)}</pre>
  </div>
);

export const ToolOutput = ({ className, output, errorText, ...props }) => {
  if (!output && !errorText) return null;
  const text = typeof output === 'string' ? output : JSON.stringify(output, null, 2);
  return (
    <div className={cn('space-y-2 p-4', className)} {...props}>
      <h4 className="ai-meta">{errorText ? '错误' : '结果'}</h4>
      <pre className={cn('ai-code overflow-x-auto rounded-md p-3', errorText ? 'bg-destructive/10 text-destructive' : 'bg-muted/50')}>
        {errorText || text}
      </pre>
    </div>
  );
};
