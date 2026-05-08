// Calculate serial number for server-side pagination
export const calculateServerSideSerialNumber = (pageIndex, pageSize, rowIndex) => {
  return pageIndex * pageSize + rowIndex + 1;
};

// Generate badge Tailwind classes based on status
export const generateBadgeClassName = (status) => {
  if (!status) return "inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-yellow-100 text-yellow-800";

  const normalized = status.toLowerCase().trim();

  if (["active", "approved", "completed", "submitted", "success"].includes(normalized)) {
    return "inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-green-100 text-green-800";
  }
  if (["inactive", "rejected", "cancelled", "failed", "error"].includes(normalized)) {
    return "inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-red-100 text-red-800";
  }
  if (["pending", "saved", "not started", "warning"].includes(normalized)) {
    return "inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-yellow-100 text-yellow-800";
  }
  if (["in progress", "in-progress", "processing"].includes(normalized)) {
    return "inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-blue-100 text-blue-800";
  }
  if (["partial", "partial approved"].includes(normalized)) {
    return "inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-gray-100 text-gray-800";
  }

  return "inline-block px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-yellow-100 text-yellow-800";
};

// Filter rows by global search query
export const filterRowsByGlobalSearch = (rows, query) => {
  if (!query || !query.trim()) return rows;
  const lower = query.toLowerCase().trim();
  return rows.filter((row) =>
    Object.values(row).some((val) => val?.toString().toLowerCase().includes(lower))
  );
};

// Sort data by column and direction
export const sortDataByColumn = (data, columnKey, isDescending) => {
  if (!columnKey) return data;

  return [...data].sort((a, b) => {
    const valA = a[columnKey];
    const valB = b[columnKey];

    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    if (typeof valA === "number" && typeof valB === "number") {
      return isDescending ? valB - valA : valA - valB;
    }

    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();
    return isDescending ? strB.localeCompare(strA) : strA.localeCompare(strB);
  });
};
