import React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  ConstrainMode,
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import { EditableTableRow } from "../editableTableRow/EditableTableRow";

import { useContextState } from "../../ContextStateProvider";

export default function Simple(props) {
  const [{ columns, items }] = useContextState();

  return (
    <DetailsList
      onRenderRow={(props, defaultRender) => <EditableTableRow {...props} />}
      items={items}
      columns={columns}
      constrainMode={ConstrainMode.unconstrained}
      compact={false}
      selectionMode={SelectionMode.multiple}
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible={true}
    />
  );
}
