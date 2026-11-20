/**
 * Shared horizontal category tabs for business project lists.
 *
 * Kept independent of the Projects page so the same tab treatment can be
 * reused by the future Help Centre.
 */
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BusinessProjectCategoryTabs({ items, value, onChange, ariaLabel }) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList aria-label={ariaLabel} className="mb-6">
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
            <span className="ml-1.5 text-xs tabular-nums opacity-60">{item.count}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
