/* Fill the {placeholder} slots the language library leaves in a sentence.
 *
 * Library strings keep their variables in braces (for example
 * "Need {amount} more Coins to unlock gift card redemption."), because the
 * value has to be formatted by the page — Coins go through formatCoinNumber,
 * dates through the interface locale. Unknown slots are left untouched so a
 * missing value shows up as {name} in review rather than as "undefined".
 */
export function interpolate(template, values = {}) {
  return String(template ?? '').replace(/\{(\w+)\}/g, (match, key) => (
    values[key] === undefined || values[key] === null || values[key] === ''
      ? match
      : String(values[key])
  ));
}
