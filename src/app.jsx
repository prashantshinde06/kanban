import React from "react";
import { useSelector } from "react-redux";
import Routes from "./routes";
import ToastNotification from "@/components/toast-notification";

const App = () => {
  // Get toast notification from Redux store
  const toastNotification = useSelector((state) => state.global?.toastNotification);

  return (
    <>
      {toastNotification?.visibility && (
        <ToastNotification
          type={toastNotification.type}
          title={toastNotification.title}
          message={toastNotification.message}
          timeOut={toastNotification.timeOut}
        />
      )}
      <Routes />
    </>
  );
};
export default App;
