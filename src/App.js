import { useEffect, useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import InnerLayout from "./components/layout/";

import {
  Home,
  AboutUs,
  ContactUs,
  MRI,
  Error,
  ComputerTomography,
} from "./pages";
import styles from "./App.module.scss";

function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem("theme")));
  }, []);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));

    localStorage.setItem(
      "theme",
      JSON.stringify(theme === "light" ? "dark" : "light")
    );
  };

  return (
    <div className={styles[theme]}>
      <Routes>
        <Route path="/" element={<Navigate replace="true" to="/home" />} />

        <Route
          path="/"
          element={<InnerLayout toggleTheme={toggleTheme} theme={theme} />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/mri" element={<MRI />} />
          <Route path="/computer-tomography" element={<ComputerTomography />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          <Route path="/404" element={<Error />} />
          <Route path="/*" element={<Navigate replace to="/404" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
