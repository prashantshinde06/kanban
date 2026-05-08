import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "@/assets/scss/main.scss";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
