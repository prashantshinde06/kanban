import React, { useState, useEffect } from "react";
import Table from "@/components/data-table";
import { generateBadgeClassName } from "@/components/data-table/table-utils";

// Employee page with generic Table component example
const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resetTable, setResetTable] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      // Mock data - 35 employees for pagination testing
      const data = [
        { id: 1, name: "John Doe", email: "john@example.com", department: "Engineering", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Marketing", status: "Active" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", department: "Sales", status: "Inactive" },
        { id: 4, name: "Alice Brown", email: "alice@example.com", department: "Engineering", status: "Active" },
        { id: 5, name: "Charlie Wilson", email: "charlie@example.com", department: "HR", status: "Active" },
        { id: 6, name: "Diana Prince", email: "diana@example.com", department: "Engineering", status: "Active" },
        { id: 7, name: "Eve Johnson", email: "eve@example.com", department: "Finance", status: "Active" },
        { id: 8, name: "Frank Miller", email: "frank@example.com", department: "Sales", status: "Inactive" },
        { id: 9, name: "Grace Lee", email: "grace@example.com", department: "Marketing", status: "Active" },
        { id: 10, name: "Henry Davis", email: "henry@example.com", department: "Engineering", status: "Active" },
        { id: 11, name: "Ivy Chen", email: "ivy@example.com", department: "HR", status: "Active" },
        { id: 12, name: "Jack Roberts", email: "jack@example.com", department: "Sales", status: "Active" },
        { id: 13, name: "Karen White", email: "karen@example.com", department: "Finance", status: "Inactive" },
        { id: 14, name: "Leo Martinez", email: "leo@example.com", department: "Engineering", status: "Active" },
        { id: 15, name: "Monica Taylor", email: "monica@example.com", department: "Marketing", status: "Active" },
        { id: 16, name: "Nathan Garcia", email: "nathan@example.com", department: "Sales", status: "Active" },
        { id: 17, name: "Olivia Anderson", email: "olivia@example.com", department: "HR", status: "Active" },
        { id: 18, name: "Peter Thompson", email: "peter@example.com", department: "Engineering", status: "Inactive" },
        { id: 19, name: "Quinn Harris", email: "quinn@example.com", department: "Finance", status: "Active" },
        { id: 20, name: "Rachel Green", email: "rachel@example.com", department: "Marketing", status: "Active" },
        { id: 21, name: "Samuel Clark", email: "samuel@example.com", department: "Sales", status: "Active" },
        { id: 22, name: "Tina Lewis", email: "tina@example.com", department: "Engineering", status: "Active" },
        { id: 23, name: "Uma Patel", email: "uma@example.com", department: "HR", status: "Inactive" },
        { id: 24, name: "Victor Walker", email: "victor@example.com", department: "Finance", status: "Active" },
        { id: 25, name: "Wendy Hall", email: "wendy@example.com", department: "Marketing", status: "Active" },
        { id: 26, name: "Xavier Young", email: "xavier@example.com", department: "Engineering", status: "Active" },
        { id: 27, name: "Yara King", email: "yara@example.com", department: "Sales", status: "Active" },
        { id: 28, name: "Zoe Scott", email: "zoe@example.com", department: "HR", status: "Active" },
        { id: 29, name: "Adam Green", email: "adam@example.com", department: "Finance", status: "Inactive" },
        { id: 30, name: "Bella Adams", email: "bella@example.com", department: "Engineering", status: "Active" },
        { id: 31, name: "Carl Nelson", email: "carl@example.com", department: "Marketing", status: "Active" },
        { id: 32, name: "Dana Carter", email: "dana@example.com", department: "Sales", status: "Active" },
        { id: 33, name: "Ethan Mitchell", email: "ethan@example.com", department: "HR", status: "Active" },
        { id: 34, name: "Fiona Roberts", email: "fiona@example.com", department: "Engineering", status: "Inactive" },
        { id: 35, name: "George Phillips", email: "george@example.com", department: "Finance", status: "Active" }
      ];
      
      setEmployees(data);
    } catch (error) {
      console.error("Error loading employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      Header: () => <div className="w-full text-center">ID</div>,
      accessor: "id",
      enableSortBy: true,
      width: 1
    },
    {
      Header: () => <div className="w-full text-center">Name</div>,
      accessor: "name",
      enableSortBy: true,
      width: 2.5
    },
    {
      Header: () => <div className="w-full text-center">Email</div>,
      accessor: "email",
      enableSortBy: true,
      width: 3
    },
    {
      Header: () => <div className="w-full text-center">Department</div>,
      accessor: "department",
      enableSortBy: true,
      width: 2
    },
    {
      Header: () => <div className="w-full text-center">Status</div>,
      accessor: "status",
      enableSortBy: true,
      width: 1.2,
      Cell: ({ value }) => (
        <span className={generateBadgeClassName(value)}>
          {value}
        </span>
      )
    },
    {
      Header: () => <div className="w-full text-center">Actions</div>,
      accessor: "actions",
      disableSortBy: true,
      width: 1.5,
      Cell: ({ row }) => (
        <div className="flex gap-2 justify-center ">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => console.log("Edit:", row.original.id)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors"
            onClick={() => console.log("Delete:", row.original.id)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      alert("Please select employees");
      return;
    }
    console.log("Bulk delete:", selectedRows.map(r => r.id));
    setResetTable(true);
  };

  return (
    <div className="w-full ">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Employee Management</h2>
        <p className="text-gray-600 mt-2">Manage and view all employees in your organization</p>
      </div>

      {selectedRows.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
          <span>
            <strong className="text-blue-900">{selectedRows.length}</strong>
            <span className="text-blue-900"> employee(s) selected</span>
          </span>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors"
            onClick={handleBulkDelete}
          >
            Delete Selected
          </button>
        </div>
      )}

      <div>
        <Table
          type="clientSide"
          rows={employees}
          headers={columns}
          isCheckboxRequired={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          isSearchable={true}
          loading={loading}
          resetTable={resetTable}
          setResetTable={setResetTable}
          addButton={{
            visibility: true,
            label: "Add Employee",
            onClickHandler: () => console.log("Add employee"),
            className: "bg-blue-600 text-white hover:bg-blue-700"
          }}
        />
      </div>
    </div>
  );
};

export default Employee;
