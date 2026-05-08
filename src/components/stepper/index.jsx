import React, { useState } from "react";

/**
 * Generic Reusable Stepper Component (MUI Style with Tailwind)
 *
 * Props:
 * - steps: Array of {label: string, component: ReactNode}
 * - onStepComplete: Callback when all steps finished
 * - onStepChange: Callback when step changes
 * - activeStep: Current active step index (default: 0)
 *
 * Usage:
 * <Stepper
 *   steps={[{label: "Step 1", component: <Form1 />}, ...]}
 *   onStepComplete={() => alert('Done!')}
 * />
 */

const Stepper = ({ steps = [], onStepComplete = () => {}, onStepChange = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
      onStepChange(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      onStepComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      onStepChange(currentStep - 1);
    }
  };

  const handleStepClick = (index) => {
    if (index <= Math.max(...completedSteps, -1) + 1) {
      setCurrentStep(index);
      onStepChange(index);
    }
  };

  const isStepCompleted = (index) => completedSteps.includes(index);
  const isStepActive = (index) => currentStep === index;
  const isStepLocked = (index) => index > Math.max(...completedSteps, -1) + 1;

  return (
    <div className="w-full">
      {/* Stepper Header */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center w-full relative mb-12">
          {/* Continuous Background Line */}
          <div className="absolute top-9 left-0 right-0 h-1 bg-gray-300"></div>

          {/* Filled Line (Progress) */}
          <div
            className="absolute top-9 left-0 h-1 bg-blue-500 transition-all duration-300"
            style={{
              width: currentStep > 0 ? `calc((${currentStep} / ${steps.length - 1}) * 100%)` : "0%",
            }}
          ></div>

          {/* Steps */}
          <ol className="flex items-center w-full relative z-10">
            {steps.map((step, index) => (
              <li key={index} className="flex flex-col items-center w-full">
                {/* Step Button */}
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={isStepLocked(index)}
                  className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full flex-shrink-0 font-bold text-sm md:text-lg transition-all shadow-md relative z-20 ${
                    isStepCompleted(index)
                      ? "bg-blue-500 text-white"
                      : isStepActive(index)
                      ? "bg-white text-blue-500 border-2 border-blue-500"
                      : isStepLocked(index)
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-600 border-2 border-gray-300"
                  }`}
                >
                  {isStepCompleted(index) ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* Step Label - Below Button */}
                <p
                  className={`mt-4 text-xs md:text-sm font-semibold text-center transition-all ${
                    isStepActive(index)
                      ? "text-gray-900 font-bold"
                      : isStepCompleted(index)
                      ? "text-gray-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm p-8 min-h-96 mb-8">
        {steps[currentStep]?.component && <div>{steps[currentStep].component}</div>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="w-full md:w-auto px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ← Previous
        </button>

        <div className="text-sm text-gray-600 font-medium">
          Step {currentStep + 1} of {steps.length}
        </div>

        <button
          onClick={handleNext}
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          {currentStep === steps.length - 1 ? "Complete" : "Next →"}
        </button>
      </div>
    </div>
  );
};

export default Stepper;
