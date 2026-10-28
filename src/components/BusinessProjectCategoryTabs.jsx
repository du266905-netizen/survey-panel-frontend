/**
 * Shared horizontal category tabs for business project lists.
 *
 * Kept independent of the Projects page so the same tab treatment can be
 * reused by the future Help Centre.
 */
export default function BusinessProjectCategoryTabs({ items, value, onChange, ariaLabel }) {
  return (
    <div className="business-project-toolbar" role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={value === item.value}
          className={value === item.value ? 'is-active' : ''}
          onClick={() => onChange(item.value)}
        >
          {item.label} <span>{item.count}</span>
        </button>
      ))}
    </div>
  );
}
