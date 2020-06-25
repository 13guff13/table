import { theme } from "../../theme/styles";
import { EditButton } from "../editButton/EditButton";
import { uniqWith } from "lodash";

const defColumn = () => ({
  headerClassName: theme.headerClassName,
  isSorted: false,
  isSortedDescending: false,
  sortAscendingAriaLabel: "Sorted A to Z",
  sortDescendingAriaLabel: "Sorted Z to A",
});

export function configToColumns(config) {
  if (config === null) return config;

  const columns = Object.keys(config).map((key) => {
    const retItem = defColumn();
    const it = config[key];
    retItem.name = it.label;
    retItem.maxWidth = it.width;
    retItem.minWidth = it.width;
    retItem.data = { type: it.type };
    retItem.key = retItem.fieldName = key;

    return retItem;
  });

  return columns;
}

export function copyAndSort(items, columnKey, isSortedDescending) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
    );
}

export function updateItems(items, newItem, comparator = (a, b) => a === b) {
  const updatedItems = items.map((it) => {
    if (comparator(it)) {
      return { ...newItem };
    } else {
      return it;
    }
  });
  return updatedItems;
}

export function editButtonColumn() {
  return {
    headerClassNiame: theme.headerClassName,
    isSorted: false,
    key: "editButtonColumn",
    name: "",
    onRender: EditButton,
  };
}

export function getUniqueClientNames(items) {
  const clientNameKey = "CLIENT_NM";
  const uniqueItems = uniqWith(items, (a, b) => {
    return a[clientNameKey] === b[clientNameKey];
  });
  return uniqueItems.map((it) => ({
    key: it[clientNameKey],
    text: it[clientNameKey],
  }));
}
