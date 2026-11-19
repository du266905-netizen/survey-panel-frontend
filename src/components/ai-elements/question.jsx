import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * AI 用选项问问题（对应 shadcn 截图里的 Question 组件）。
 * 用法：brief 里缺字段时，一次问一个，给 3 个选项 + 一个自由输入。
 */
export const Question = ({
  step,
  total,
  title,
  description,
  options = [],
  value,
  onChange,
  otherValue = '',
  onOtherChange,
  onSubmit,
  submitLabel = '下一步',
  disabled = false,
  className,
  ...props
}) => (
  <section className={cn('mx-auto w-full max-w-[720px] py-10', className)} {...props}>
    <h2 className="ai-title">{title}</h2>
    {description && <p className="ai-prose mt-2 text-muted-foreground">{description}</p>}

    <div className="mt-6 flex flex-col gap-2.5" role="radiogroup" aria-label={title}>
      {options.map((option, index) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            aria-checked={active}
            className={cn(
              'flex w-full items-start gap-3 rounded-xl border bg-background p-4 text-left transition-colors',
              active ? 'border-foreground' : 'border-border hover:border-foreground/40',
            )}
            onClick={() => onChange?.(option.id)}
            role="radio"
            type="button"
          >
            <span
              className={cn(
                'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border',
                active ? 'border-foreground' : 'border-border',
              )}
            >
              {active && <span className="size-2 rounded-full bg-foreground" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="ai-ui block text-foreground">{option.label}</span>
              {option.description && <span className="ai-ui mt-1 block font-normal text-muted-foreground">{option.description}</span>}
            </span>
            <span className="ai-meta mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border border-border">
              {String.fromCharCode(65 + index)}
            </span>
          </button>
        );
      })}
    </div>

    {onOtherChange && (
      <Input
        className="ai-ui mt-3 h-10 rounded-xl"
        onChange={(event) => onOtherChange(event.target.value)}
        placeholder="或者直接描述你的情况…"
        value={otherValue}
      />
    )}

    <div className="mt-5 flex justify-end">
      <Button className="ai-ui" disabled={disabled || (!value && !otherValue)} onClick={onSubmit} type="button">
        {submitLabel}
      </Button>
    </div>
  </section>
);
