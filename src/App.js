import React from "react";
import Table from "./components/table/Table";
import { useApi } from "./hooks";
import { CONFIG_URL, ITEMS_URL } from "./constants";
import {
  tableContextReducer,
  tableContextInitState,
} from "./components/table/TableContext";
import { ContextStateProvider } from "./ContextStateProvider";
import { editButtonColumn, configToColumns } from "./components/table/utils";

export default function App() {
  const { config } = useApi(CONFIG_URL);
  const { items } = useApi(ITEMS_URL);

  if (!config || !items) {
    return null;
  }

  const columns = configToColumns(config);
  columns.push(editButtonColumn());
  const tableContextValue = { ...tableContextInitState, items, columns };

  return (
    <ContextStateProvider
      initState={tableContextValue}
      reducer={tableContextReducer}
    >
      <Table />
    </ContextStateProvider>
  );
}
