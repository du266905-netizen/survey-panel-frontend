import { ChevronsUpDownIcon } from 'lucide-react';
import { createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Shimmer } from './shimmer';
import { cn } from '@/lib/utils';

const PlanContext = createContext({ isStreaming: false });
const usePlan = () => useContext(PlanContext);

export const Plan = ({ className, isStreaming = false, children, ...props }) => (
  <PlanContext.Provider value={{ isStreaming }}>
    <Collapsible asChild data-slot="plan" {...props}>
      <Card className={cn('shadow-none', className)}>{children}</Card>
    </Collapsible>
  </PlanContext.Provider>
);

export const PlanHeader = ({ className, ...props }) => (
  <CardHeader className={cn('flex flex-row items-start justify-between gap-4 space-y-0', className)} data-slot="plan-header" {...props} />
);

export const PlanTitle = ({ children, ...props }) => {
  const { isStreaming } = usePlan();
  return (
    <CardTitle data-slot="plan-title" {...props}>
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardTitle>
  );
};

export const PlanDescription = ({ className, children, ...props }) => {
  const { isStreaming } = usePlan();
  return (
    <CardDescription className={cn('text-balance', className)} data-slot="plan-description" {...props}>
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardDescription>
  );
};

export const PlanAction = ({ className, ...props }) => (
  <div className={cn('shrink-0', className)} data-slot="plan-action" {...props} />
);

export const PlanContent = (props) => (
  <CollapsibleContent asChild>
    <CardContent data-slot="plan-content" {...props} />
  </CollapsibleContent>
);

export const PlanFooter = (props) => <CardFooter data-slot="plan-footer" {...props} />;

export const PlanTrigger = ({ className, ...props }) => (
  <CollapsibleTrigger asChild>
    <Button className={cn('size-8', className)} data-slot="plan-trigger" size="icon" variant="ghost" {...props}>
      <ChevronsUpDownIcon className="size-4" />
      <span className="sr-only">展开计划</span>
    </Button>
  </CollapsibleTrigger>
);
