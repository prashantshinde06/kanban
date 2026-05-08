import React from "react";

const Spinner = ({ size = "w-10 h-10", colorClass = "text-blue-600", className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-live="polite"
      aria-busy="true"
    >
      <svg
        className={`animate-spin ${size} ${colorClass}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="img"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner;
