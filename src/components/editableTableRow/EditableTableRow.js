import React from "react";
import { DetailsRow, TextField, Dropdown, ComboBox } from "@fluentui/react/lib";

import { ACTIONS } from "../table/TableContext";
import { useContextState } from "../../ContextStateProvider";
import { theme } from "../../theme/styles";

const sourceNameOptions = [
  { key: "DEV", text: "dev" },
  { key: "UAT", text: "UAT", disabled: true },
  { key: "PROD", text: "prod" },
];

const onRenderItemColumn = (item, _, column) => {
  const fieldContent = item[column.fieldName];
  if (column.key === "VALUE_1") {
    const value = Number(item[column.fieldName]);
    switch (true) {
      case value > 3000:
        return <span className={theme.criticalValue}>{value}</span>;
      case value > 2000:
        return <span className={theme.moderateValue}>{value}</span>;
      default:
        return <span>{value}</span>;
    }
  }
  return <span>{fieldContent}</span>;
};

export function EditableTableRow(props) {
  const [
    {
      editingRow: { id: editingRowId, data },
    },
    provideTableContextValue,
  ] = useContextState();

  const onRenderEditItemColumn = (rowProps, idx, column) => {
    const value = data[column.key];

    const onTextFieldChange = (e) => {
      provideTableContextValue({
        type: ACTIONS.EDIT_TABLE_ROW,
        payload: { [column.key]: e.target.value },
      });
    };

    switch (column.key) {
      case "SOURCE_NM":
        return (
          <Dropdown
            placeholder="Select an option"
            options={sourceNameOptions}
          />
        );
      case "CLIENT_NM":
        return (
          <ComboBox
            defaultSelectedKey="C"
            label=""
            allowFreeform
            autoComplete="on"
            options={sourceNameOptions}
          />
        );
      case "DESCRIPTION":
      default:
        return (
          <TextField label="" onChange={onTextFieldChange} value={value} />
        );
    }
  };

  const customStyles = {};
  if (props.itemIndex % 2 === 0) {
    customStyles.root = { backgroundColor: "#D8EEFD" };
  }
  let isRowEditing = editingRowId !== null && editingRowId === props.item.RN;

  return (
    <DetailsRow
      {...props}
      onRenderItemColumn={
        isRowEditing ? onRenderEditItemColumn : onRenderItemColumn
      }
      styles={customStyles}
    />
  );
}
