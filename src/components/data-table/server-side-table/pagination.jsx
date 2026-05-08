import React from "react";

const ServerSidePagination = ({
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  setTablePageSize,
  totalCount
}) => {
  const startEntry = pageIndex * pageSize + 1;
  const endEntry = Math.min((pageIndex + 1) * pageSize, totalCount);
  const pageCount = Math.ceil(totalCount / pageSize);

  const handlePrevious = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleNext = () => {
    if (pageIndex < pageCount - 1) setPageIndex(pageIndex + 1);
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setTablePageSize(newSize);
    setPageIndex(0);
  };

  return (
    <div className="flex justify-between items-center flex-wrap p-4 border-t border-gray-200 bg-gray-50 gap-5">
      <div>
        <span className="text-sm text-gray-600 font-medium">
          {totalCount === 0
            ? "No items"
            : `${startEntry}-${endEntry} of ${totalCount} items`}
        </span>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-600 font-medium">Items per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handlePrevious}
            disabled={pageIndex === 0}
            title="Previous Page"
          >
            Previous
          </button>

          <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
            Page {pageIndex + 1} of {pageCount || 1}
          </span>

          <button
            className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleNext}
            disabled={pageIndex >= pageCount - 1}
            title="Next Page"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerSidePagination;
