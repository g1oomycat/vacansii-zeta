import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PopupApplicationsSendToServer from "./store/PopupSendToServer";
import PopupCMS from "./store/PopupCMS";
import DataVacFromServer from "./store/DataVacFromServer";
import DataApplFromServer from "./store/DataApplFromServer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider
    value={{
      isOpenPopupServer: new PopupApplicationsSendToServer(),
      isOpenPopupCMS: new PopupCMS(),
      dataVacFromServer: new DataVacFromServer(),
      dataApplFromServer: new DataApplFromServer(),
    }}
  >
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Context.Provider>
);
