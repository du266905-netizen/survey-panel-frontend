import { cn } from '@/lib/utils';

export const Shimmer = ({ children, className, as: Component = 'span', ...props }) => (
  <Component className={cn('ai-shimmer', className)} {...props}>
    {children}
  </Component>
);
