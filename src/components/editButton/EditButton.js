import React from "react";
import { ACTIONS } from "../table/TableContext";
import { useContextState } from "../../ContextStateProvider";

export const EditButton = (item, idx, column) => {
  const [
    {
      editingRow: { id: editingRowId },
    },
    provideTableContextValue,
  ] = useContextState();

  const _onEdit = (e) => {
    provideTableContextValue({
      type: ACTIONS.EDIT_TABLE_ROW_ON,
      payload: { id: item.RN, data: item },
    });
  };

  const _onSave = (e) => {
    provideTableContextValue({
      type: ACTIONS.SAVE_TABLE_ROW,
    });
  };

  if (item.RN === editingRowId) {
    return <button onClick={_onSave}>save</button>;
  }
  return (
    <button onClick={_onEdit} disabled={editingRowId !== null}>
      edit
    </button>
  );
};
