import { FileTextIcon, PaperclipIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const AttachmentChip = ({ className, name, size, onRemove, ...props }) => (
  <span
    className={cn(
      'ai-ui inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-secondary-foreground',
      className,
    )}
    {...props}
  >
    <FileTextIcon className="size-4 text-muted-foreground" />
    <span className="max-w-[220px] truncate">{name}</span>
    {size && <span className="text-muted-foreground">{size}</span>}
    {onRemove && (
      <button aria-label={`移除 ${name}`} className="text-muted-foreground hover:text-foreground" onClick={onRemove} type="button">
        <XIcon className="size-3.5" />
      </button>
    )}
  </span>
);

export const AttachmentList = ({ className, files = [], onRemove, onAdd, ...props }) => (
  <div className={cn('flex flex-wrap items-center gap-2', className)} {...props}>
    {files.map((file) => (
      <AttachmentChip key={file.id || file.name} name={file.name} onRemove={() => onRemove?.(file)} size={file.size} />
    ))}
    {onAdd && (
      <Button className="ai-ui h-8 gap-1.5 rounded-lg px-2.5" onClick={onAdd} size="sm" type="button" variant="outline">
        <PaperclipIcon className="size-3.5" />
        添加附件
      </Button>
    )}
  </div>
);
