import { useEffect } from 'react';

/* One document title per page, in the reader's language.

   2026-10-25: every route used to inherit the single English <title> from
   index.html. The title is now composed from copy already in the language
   library, so it follows the language switch without a second string table. */
export default function usePageTitle(title) {
  useEffect(() => {
    if (title) document.title = `${title} — GuanyiSearch`;
  }, [title]);
}
