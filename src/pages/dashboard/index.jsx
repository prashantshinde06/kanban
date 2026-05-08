import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToastNotification } from "@/redux/slices/global.slice";
import GenericModal from "@/components/modal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Toast notification handlers
  const showSuccessToast = () => {
    dispatch(
      setToastNotification({
        visibility: true,
        type: "success",
        title: "Success!",
        message: "Your changes have been saved successfully.",
        timeOut: 4000,
      })
    );
  };

  const showErrorToast = () => {
    dispatch(
      setToastNotification({
        visibility: true,
        type: "error",
        title: "Error!",
        message: "Something went wrong. Please try again.",
        timeOut: 5000,
      })
    );
  };

  const showWarningToast = () => {
    dispatch(
      setToastNotification({
        visibility: true,
        type: "warning",
        title: "Warning!",
        message: "Please review this action before proceeding.",
        timeOut: 5000,
      })
    );
  };

  const showInfoToast = () => {
    dispatch(
      setToastNotification({
        visibility: true,
        type: "info",
        title: "Information",
        message: "New updates are available. Please refresh to see changes.",
        timeOut: 4000,
      })
    );
  };

  // Modal handlers
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const modalButtons = [
    {
      name: "Cancel",
      className: "px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors",
      onClickMethod: closeModal,
      visibility: true,
    },
    {
      name: "Confirm",
      className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
      onClickMethod: () => {
        dispatch(
          setToastNotification({
            visibility: true,
            type: "success",
            title: "Confirmed!",
            message: "Action confirmed successfully.",
            timeOut: 3000,
          })
        );
        closeModal();
      },
      visibility: true,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">MyApp</div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            Dashboard
          </a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            Users
          </a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
        </header>

        {/* Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* Toast Test Buttons */}
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Toast Notification Tests</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={showSuccessToast}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                ✓ Success
              </button>
              <button
                onClick={showErrorToast}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                ✕ Error
              </button>
              <button
                onClick={showWarningToast}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
              >
                ⚠ Warning
              </button>
              <button
                onClick={showInfoToast}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                ℹ Info
              </button>
              <button
                onClick={openModal}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
              >
                📋 Open Modal
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-gray-500">Users</h2>
              <p className="text-2xl font-bold">120</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-gray-500">Revenue</h2>
              <p className="text-2xl font-bold">$5,200</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-gray-500">Orders</h2>
              <p className="text-2xl font-bold">320</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">John Doe</td>
                  <td className="p-2">john@example.com</td>
                  <td className="p-2 text-green-500">Active</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Jane Smith</td>
                  <td className="p-2">jane@example.com</td>
                  <td className="p-2 text-red-500">Inactive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        {/* Generic Modal Component */}
        <GenericModal
          showModal={showModal}
          title="Confirm Action"
          message="Are you sure you want to proceed with this action?"
          headIcon={null}
          modalButtonList={modalButtons}
        />
      </div>
    </div>
  );
};

export default Dashboard;
