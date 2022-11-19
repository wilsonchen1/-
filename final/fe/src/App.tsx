import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLout from "./components/AppLayout/AppLayout";
import Stuinfo from "./components/stuinfo";
import AboutPage from "./pages/aboutPage/aboutPage";
import LoginPage from "./pages/loginPage/loginPage";
import TablePage from "./pages/tablePage/tablePage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLout />}>
          <Route path="/" element={<TablePage />}></Route>
          <Route path="student/:id" element={<Stuinfo></Stuinfo>}></Route>
          <Route path="About" element={<AboutPage />}></Route>

        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
