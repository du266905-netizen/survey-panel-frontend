import { Search } from 'lucide-react';
import BusinessBalanceChip from './BusinessBalanceChip';
import NotificationBell from './NotificationBell';

/* One top bar for the whole research end. The workspace owns the search state
   and passes it in; pages that only need the chrome leave it inert rather than
   growing a second, slightly different header. */
export default function BusinessTopBar({
  query = '', onQueryChange, onSubmit, inputRef, placeholder = 'ask a question in guanyisearch',
}) {
  return (
    <header className="business-workspace-topbar">
      <form className="business-workspace-searchbar" role="search" aria-label={placeholder} onSubmit={onSubmit}>
        <Search size={17} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => onQueryChange?.(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <kbd aria-hidden="true">⌘K</kbd>
      </form>
      <BusinessBalanceChip />
      <NotificationBell className="business-workspace-notification" />
    </header>
  );
}
