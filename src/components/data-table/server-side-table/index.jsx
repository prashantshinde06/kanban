import React, { useMemo, useState, useEffect, useRef } from "react";
import Spinner from "@/components/spinner";
import { useTable, useSortBy, usePagination, useFlexLayout } from "react-table";
import ServerSidePagination from "./pagination";

const ServerSideTable = ({
  rows = [],
  headers = [],
  totalCount = 0,
  apiCallFunction = () => {},
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
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState({ columnName: null, isDesc: false });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [internalLoading, setInternalLoading] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (resetTable) {
      setSearchQuery("");
      setSorting({ columnName: null, isDesc: false });
      setPageIndex(0);
      setPageSize(10);
      setFilterValues({});
      setSelectedRows([]);
      setResetTable(false);
    }
  }, [resetTable, setResetTable, setFilterValues, setSelectedRows]);

  const columns = useMemo(
    () =>
      headers.map((header) => ({
        ...header,
        disableSortBy: header.disableSortBy || false,
      })),
    [headers]
  );

  const data = useMemo(() => rows, [rows]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows: tableRows,
    prepareRow,
    state: tableState,
    setPageSize: setTablePageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const makeApiCall = (page, pSize, search, sort, filters) => {
    setInternalLoading(true);
    const payload = {
      pageIndex: page,
      pageSize: pSize,
      searchQuery: search,
      filters: filters,
      sorting: sort,
    };
    try {
      apiCallFunction(payload);
    } catch (error) {
      console.error("API call error:", error);
    } finally {
      setInternalLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPageIndex(0);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      makeApiCall(0, pageSize, query, sorting, filterValues);
    }, 500);
  };

  const handleSortChange = (columnName, isSortedDesc) => {
    const newSorting = { columnName, isDesc: isSortedDesc };
    setSorting(newSorting);
    setPageIndex(0);
    makeApiCall(0, pageSize, searchQuery, newSorting, filterValues);
  };

  useEffect(() => {
    makeApiCall(pageIndex, pageSize, searchQuery, sorting, filterValues);
  }, [pageIndex, filterValues]);

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setTablePageSize(newSize);
    setPageIndex(0);
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setSorting({ columnName: null, isDesc: false });
    setPageIndex(0);
    setPageSize(10);
    setFilterValues({});
    setSelectedRows([]);
    makeApiCall(0, 10, "", { columnName: null, isDesc: false }, {});
  };

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
    if (selectedRows.length === tableRows.length && tableRows.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableRows.map((row) => row.original));
    }
  };

  const isAllSelected = selectedRows.length === tableRows.length && tableRows.length > 0;
  const handleRowClick = (rowData) => {
    if (isRowClickable && onRowClickHandler) onRowClickHandler(rowData);
  };

  const isLoading = loading || internalLoading;

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden mb-5 ${cardClassName}`}>
      <div className="flex justify-between items-center p-5 border-b border-gray-200 flex-wrap gap-5">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap">Table Data</h3>
          {isSearchable && (
            <div className="flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          {children}
          {isRefreshable && (
            <button
              className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              onClick={handleRefresh}
              disabled={isLoading}
              title="Refresh table"
            >
              ↻ Refresh
            </button>
          )}
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Spinner size="w-8 h-8" colorClass="text-blue-500" />
            <p className="mt-3 text-gray-600">Loading data...</p>
          </div>
        ) : tableRows.length === 0 ? (
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
                        title="Select all rows on this page"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </th>
                  )}
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(
                        column.disableSortBy
                          ? {}
                          : {
                              onClick: () => {
                                const isSortedDesc = column.isSorted ? !column.isSortedDesc : false;
                                handleSortChange(column.id, isSortedDesc);
                                column.toggleSortBy(!column.isSortedDesc);
                              },
                            }
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
              {tableRows.map((row, rowIndex) => {
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
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${
                      isRowSelected ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleRowClick(row.original)}
                  >
                    {isCheckboxRequired && (
                      <td className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={isRowSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleRowSelection(row.original);
                          }}
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

      {!isLoading && tableRows.length > 0 && (
        <ServerSidePagination
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
          setTablePageSize={setTablePageSize}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};

export default ServerSideTable;
