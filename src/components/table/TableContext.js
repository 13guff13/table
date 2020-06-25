import React, { createContext } from "react";
import { updateItems } from "./utils";

export const tableContextInitState = { items: [], editingRow: { id: null } };
export const TableContext = createContext(tableContextInitState);

export const ACTIONS = Object.freeze({
  EDIT_TABLE_ROW_ON: "EDIT_TABLE_ROW_ON",
  EDIT_TABLE_ROW: "EDIT_TABLE_ROW",
  SAVE_TABLE_ROW: "SAVE_TABLE_ROW",
});

export function tableContextReducer(state, action) {
  console.log("context reducer", action, state);

  switch (action.type) {
    case ACTIONS.EDIT_TABLE_ROW_ON:
      return { ...state, editingRow: action.payload };
    case ACTIONS.EDIT_TABLE_ROW:
      const newEditingRowData = { ...state.editingRow.data, ...action.payload };
      return {
        ...state,
        editingRow: { id: state.editingRow.id, data: newEditingRowData },
      };
    case ACTIONS.SAVE_TABLE_ROW:
      const { data } = state.editingRow;
      const newItems = updateItems(
        state.items,
        data,
        (it) => it.RN === data.RN
      );
      return { ...state, editingRow: { id: null }, items: newItems };
    default:
      throw new Error(`there is no type ${action.type}`);
  }
}
