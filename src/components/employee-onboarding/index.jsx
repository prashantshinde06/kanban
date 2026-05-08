import React, { useState } from "react";
import Stepper from "@/components/stepper";
import { useDispatch } from "react-redux";
import { setToastNotification } from "@/redux/slices/global.slice";

const EmployeeOnboarding = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    // Organizational Details
    roleDesignation: "",
    department: "",
    team: "",
    reportingManager: "",
    // Compensation
    baseSalary: "",
    currencyType: "USD",
    paymentFrequency: "monthly",
    // Documents & Probation
    probationPeriod: "3",
    documentUpload: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStepComplete = () => {
    dispatch(
      setToastNotification({
        visibility: true,
        type: "success",
        title: "Onboarding Complete",
        message: "Employee onboarding process completed successfully!",
        timeOut: 4000,
      })
    );
    console.log("Onboarding Complete", formData);
  };

  const handleStepChange = (stepIndex) => {
    console.log("Step changed to:", stepIndex);
  };

  // Form Components for each step
  const PersonalDetailsForm = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Details</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const OrganizationalDetailsForm = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Organizational Details</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Role / Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="roleDesignation"
              value={formData.roleDesignation}
              onChange={handleInputChange}
              placeholder="Enter role / designation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Team</label>
            <input
              type="text"
              name="team"
              value={formData.team}
              onChange={handleInputChange}
              placeholder="Enter team"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Reporting Manager <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="reportingManager"
              value={formData.reportingManager}
              onChange={handleInputChange}
              placeholder="Enter reporting manager"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const CompensationForm = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Compensation</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Base Salary <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="number"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleInputChange}
                placeholder="Enter salary amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              name="currencyType"
              value={formData.currencyType}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Payment Frequency <span className="text-red-500">*</span>
          </label>
          <select
            name="paymentFrequency"
            value={formData.paymentFrequency}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="weekly">Weekly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
      </div>
    </div>
  );

  const DocumentsAndProbationForm = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Documents & Probation</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Probation Period (Months) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="probationPeriod"
            value={formData.probationPeriod}
            onChange={handleInputChange}
            placeholder="Enter probation period"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Upload Documents
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
            <input
              type="file"
              name="documentUpload"
              onChange={handleInputChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-sm font-medium text-gray-900">Click to upload documents</p>
              <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const stepperSteps = [
    {
      label: "Personal Details",
      component: <PersonalDetailsForm />,
    },
    {
      label: "Organizational Details",
      component: <OrganizationalDetailsForm />,
    },
    {
      label: "Compensation",
      component: <CompensationForm />,
    },
    {
      label: "Documents & Probation",
      component: <DocumentsAndProbationForm />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Employee Onboarding</h1>
        <p className="text-gray-600 mt-2">Complete all steps to finish the onboarding process</p>
      </div>

      {/* Stepper Component */}
      <Stepper
        steps={stepperSteps}
        onStepComplete={handleStepComplete}
        onStepChange={handleStepChange}
      />
    </div>
  );
};

export default EmployeeOnboarding;
