import React from "react";
import ClientSideTable from "./client-side-table";
import ServerSideTable from "./server-side-table";

/**
 * Generic Table Component
 * Routes between client and server-side implementations
 */
const Table = ({
  type = "clientSide",
  rows = [],
  headers = [],
  totalCount = 0,
  apiCallFunction,
  cardClassName = "",
  isCheckboxRequired = false,
  selectedRows = [],
  setSelectedRows = () => {},
  isSearchable = false,
  isRefreshable = false,
  isRowClickable = false,
  onRowClickHandler = () => {},
  loading = false,
  resetTable = false,
  setResetTable = () => {},
  filterValues = {},
  setFilterValues = () => {},
  addButton = { visibility: false },
  children = null,
}) => {
  if (type === "serverSide") {
    return (
      <ServerSideTable
        rows={rows}
        headers={headers}
        totalCount={totalCount}
        apiCallFunction={apiCallFunction}
        cardClassName={cardClassName}
        isCheckboxRequired={isCheckboxRequired}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        isSearchable={isSearchable}
        isRefreshable={isRefreshable}
        isRowClickable={isRowClickable}
        onRowClickHandler={onRowClickHandler}
        loading={loading}
        resetTable={resetTable}
        setResetTable={setResetTable}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        addButton={addButton}
        children={children}
      />
    );
  }

  // Default to client-side table
  return (
    <ClientSideTable
      rows={rows}
      headers={headers}
      cardClassName={cardClassName}
      isCheckboxRequired={isCheckboxRequired}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      isSearchable={isSearchable}
      loading={loading}
      resetTable={resetTable}
      setResetTable={setResetTable}
      addButton={addButton}
      children={children}
    />
  );
};

export default Table;
