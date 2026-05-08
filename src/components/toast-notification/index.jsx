import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import InfoIcon from "@/assets/images/icons/alert-info-icon.svg";
import WarningIcon from "@/assets/images/icons/alert-warning-icon.svg";
import ErrorIcon from "@/assets/images/icons/cross-red-icon.svg";
import SuccessSmallIcon from "@/assets/images/icons/success-small-icon.svg";
import { setToastNotification } from "@/redux/slices/global.slice";

const ToastNotification = (props) => {
  const { type = null, title = null, message = null, timeOut = 4000 } = props;

  const dispatch = useDispatch();

  const decideTimeOut = type === "error" || type === "warning" ? 5000 : timeOut;

  const onClose = useCallback(() => {
    dispatch(
      setToastNotification({
        visibility: false,
        type: "",
        title: "",
        message: "",
        timeOut: decideTimeOut,
      })
    );
  }, [dispatch, decideTimeOut]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, decideTimeOut);

    return () => clearTimeout(timer);
  }, [onClose, decideTimeOut]);

  let iconImage = null;

  switch (type) {
    case "success":
      iconImage = SuccessSmallIcon;
      break;
    case "error":
      iconImage = ErrorIcon;
      break;
    case "warning":
      iconImage = WarningIcon;
      break;
    case "info":
      iconImage = InfoIcon;
      break;
    default:
      break;
  }

  return (
    <div className="toast-container">
      <div className={`toast-notification ${type} active`} role="alert">
        {iconImage && (
          <div className="toast-icon">
            <img src={iconImage} alt={type} />
          </div>
        )}

        <div className="toast-content">
          {title && <h4 className="toast-title">{title}</h4>}
          {message && <p className="toast-message">{message}</p>}
        </div>

        <button
          type="button"
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Close notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
