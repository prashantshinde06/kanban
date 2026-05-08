import React from "react";

const GenericModal = (props) => {
  const {
    showModal = false,
    title = "",
    message = "",
    headIcon = null,
    children = null,
    modalButtonList = [],
  } = props;

  const showHideClassName = showModal ? "flex" : "hidden";

  return (
    <div
      className={`generic-modal ${showHideClassName} fixed inset-0 bg-black/50 z-50 items-center justify-center`}
    >
      <div className="modal-dialog relative w-full max-w-md mx-auto">
        <div className="modal-content bg-white rounded-lg shadow-lg">
          {/* Close Button */}
          <div className="modal-header flex justify-end items-center p-4 border-b border-gray-200">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 text-2xl font-semibold transition-colors"
              aria-label="Close"
              onClick={modalButtonList[0]?.onClickMethod}
            >
              ×
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-6">
            {/* Header Icon */}
            {headIcon && (
              <div className="mb-4 flex justify-center">
                <img src={headIcon} alt="header-icon" className="h-12 w-12" />
              </div>
            )}

            {/* Title */}
            {title && (
              <h3 className="modal-title text-xl font-bold text-gray-900 mb-3 text-center">
                {title}
              </h3>
            )}

            {/* Message */}
            {message && <p className="modal-message text-gray-600 text-center mb-4">{message}</p>}

            {/* Custom Children Content */}
            {children && <div className="modal-children mb-6">{children}</div>}

            {/* Modal Buttons */}
            {modalButtonList?.length > 0 && (
              <div className="modal-buttons flex gap-3 justify-center">
                {modalButtonList
                  .filter((buttonItem) => buttonItem?.visibility !== false)
                  .map((buttonItem, index) => (
                    <button
                      key={index}
                      type="button"
                      className={
                        buttonItem?.className ||
                        "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      }
                      onClick={buttonItem?.onClickMethod}
                    >
                      {buttonItem?.name || ""}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
