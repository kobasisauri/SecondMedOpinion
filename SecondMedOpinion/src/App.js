import { Suspense, useEffect } from "react";
import { Route, Navigate, Routes, useLocation } from "react-router-dom";
import InnerLayout from "./components/layout";
import useStore from "./stores/store";
import {
  Home,
  AboutUs,
  ContactUs,
  MRI,
  Error,
  ComputerTomography,
  Form,
  TearmsAndConditions,
  Resume,
  PrivacyPolicy,
} from "./pages";
import styles from "./App.module.scss";
import PageLoading from "./components/UI/PageLoading";

function App() {
  const { pathname } = useLocation();
  const { theme } = useStore((state) => state);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // to do
  // useEffect(() => {
  //   setTheme(JSON.parse(localStorage.getItesm("theme")));
  // }, [setTheme]);

  return (
    <div className={styles[theme]}>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Navigate replace="true" to="/home" />} />

          <Route path="/" element={<InnerLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/mri" element={<MRI />} />
            <Route path="/mri/:id" element={<Resume />} />
            <Route
              path="/computer-tomography"
              element={<ComputerTomography />}
            />
            <Route path="/ct/:id" element={<Resume />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/form" element={<Form />} />
            <Route
              path="/tearms-and-conditions"
              element={<TearmsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="/404" element={<Error />} />
            <Route path="/*" element={<Navigate replace to="/404" />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
