import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./styles/main.scss";
import MainPage from "./Pages/MainPage/MainPage";
import CMSpage from "./Pages/CMSPage/CMSPage";
import AuthorizationPage from "./Pages/AuthorizationPage/AuthorizationPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Protected from "./Components/Protected/Protected";
import { Context } from ".";

const App = observer(() => {
  const location = useLocation();
  // const { statusOpenAllPopup } = useContext(Context);

  // useEffect(() => {
  //   if (statusOpenAllPopup.isOpen) {
  //     document.documentElement.style.setProperty("--scrolledY", window.scrollY);
  //     document.body.classList.add("active_body");
  //   } else {
  //     document.body.classList.remove("active_body");
  //   }
  // }, [statusOpenAllPopup.isOpen]);

  return (
    <main className="main">
      <Routes>
        <Route
          location={location}
          key={location.pathname}
          path="/"
          element={<MainPage />}
        />
        <Route index element={<MainPage />} />

        <Route path="/admin_panel" element={<CMSpage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/admin_panel" element={<Protected />}>
          <Route index element={<CMSpage />} />
        </Route>
      </Routes>
    </main>
  );
});

export default App;
