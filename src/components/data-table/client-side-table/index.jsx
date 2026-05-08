import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination, useFlexLayout } from "react-table";
import ClientSidePagination from "./pagination";
import { filterRowsByGlobalSearch, sortDataByColumn } from "../table-utils";

const ClientSideTable = ({
  rows = [],
  headers = [],
  cardClassName = "",
  isCheckboxRequired = false,
  selectedRows = [],
  setSelectedRows = () => {},
  isSearchable = false,
  loading = false,
  resetTable = false,
  setResetTable = () => {},
  addButton = { visibility: false },
  children = null,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [filteredData, setFilteredData] = useState(rows);

  useEffect(() => {
    if (resetTable) {
      setGlobalFilter("");
      setFilteredData(rows);
      setSelectedRows([]);
      setResetTable(false);
    }
  }, [resetTable, setResetTable, rows, setSelectedRows]);

  useEffect(() => {
    const filtered = filterRowsByGlobalSearch(rows, globalFilter);
    setFilteredData(filtered);
  }, [rows, globalFilter]);

  const columns = useMemo(
    () =>
      headers.map((header) => ({
        ...header,
        disableSortBy: header.disableSortBy || false,
      })),
    [headers]
  );

  const data = useMemo(() => filteredData, [filteredData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const handleRowSelection = (row) => {
    const rowId = row.id || row;
    const isSelected = selectedRows.some(
      (selectedRow) => (selectedRow.id !== undefined ? selectedRow.id : selectedRow) === rowId
    );

    if (isSelected) {
      setSelectedRows(
        selectedRows.filter(
          (selectedRow) => (selectedRow.id !== undefined ? selectedRow.id : selectedRow) !== rowId
        )
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleSelectAll = () => {
    // Select/deselect all rows from the filtered data (all pages, not just current page)
    const allFilteredRows = data.map((row) => row);

    // Check if all rows are already selected
    const allRowsSelected = allFilteredRows.every((row) =>
      selectedRows.some(
        (selectedRow) =>
          (selectedRow.id !== undefined ? selectedRow.id : selectedRow) ===
          (row.id !== undefined ? row.id : row)
      )
    );

    if (allRowsSelected) {
      // If all are selected, deselect all
      setSelectedRows([]);
    } else {
      // Otherwise, select all rows from filtered data
      setSelectedRows(allFilteredRows);
    }
  };

  // Check if all rows in current filtered data are selected
  const isAllSelected = useMemo(() => {
    if (data.length === 0) return false;
    return data.every((row) =>
      selectedRows.some(
        (selectedRow) =>
          (selectedRow.id !== undefined ? selectedRow.id : selectedRow) ===
          (row.id !== undefined ? row.id : row)
      )
    );
  }, [selectedRows, data]);

  const handleSearchChange = (e) => {
    setGlobalFilter(e.target.value);
    gotoPage(0);
  };

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${cardClassName}`}>
      <div className="flex justify-between items-center p-5 border-b border-gray-200 flex-wrap gap-5">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap">Table Data</h3>
          {isSearchable && (
            <div className="flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search..."
                value={globalFilter}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          {children}
          {addButton.visibility && (
            <button
              className={`px-4 py-2 rounded text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:shadow ${
                addButton.className || "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={addButton.onClickHandler}
              title={addButton.label}
            >
              + {addButton.label}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-3 text-gray-600">Loading data...</p>
          </div>
        ) : page.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <table {...getTableProps()} className="w-full border-collapse">
            <thead>
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={`header-${headerGroupIndex}`}
                  className="border-b border-gray-200 bg-gray-50"
                >
                  {isCheckboxRequired && (
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        title="Select all rows"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </th>
                  )}
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(
                        column.disableSortBy ? {} : column.getSortByToggleProps()
                      )}
                      key={column.id}
                      className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 ${
                        !column.disableSortBy ? "cursor-pointer hover:bg-gray-100" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{column.render("Header")}</span>
                        {!column.disableSortBy && (
                          <span className="text-xs text-gray-400">
                            {column.isSorted ? (column.isSortedDesc ? "↓" : "↑") : "↕"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);
                const rowId = row.original.id || rowIndex;
                const isRowSelected = selectedRows.some(
                  (selectedRow) =>
                    (selectedRow.id !== undefined ? selectedRow.id : selectedRow) === rowId
                );

                return (
                  <tr
                    {...row.getRowProps()}
                    key={`${pageIndex}-${rowIndex}`}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      isRowSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    {isCheckboxRequired && (
                      <td className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={isRowSelected}
                          onChange={() => handleRowSelection(row.original)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
                    )}
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        key={`${pageIndex}-${rowIndex}-${cellIndex}`}
                        className="px-4 py-3 text-sm text-gray-900"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {!loading && page.length > 0 && (
        <ClientSidePagination
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          filteredRows={filteredData}
          pageCount={pageCount}
          gotoPage={gotoPage}
        />
      )}
    </div>
  );
};

export default ClientSideTable;
