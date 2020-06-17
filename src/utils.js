export function copyAndSort(items, columnKey, isSortedDescending) {
  const key = columnKey;
  return items.slice(0).sort((a, b) => (
    (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}