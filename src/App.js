import { Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
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
  Resume,
} from "./pages";
import styles from "./App.module.scss";
import PageLoading from "./components/UI/PageLoading";

function App() {
  const { theme } = useStore((state) => state);

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
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/form" element={<Form />} />

            <Route path="/404" element={<Error />} />
            <Route path="/*" element={<Navigate replace to="/404" />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
