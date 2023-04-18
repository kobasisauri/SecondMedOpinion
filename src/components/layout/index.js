import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./styles.module.scss";
import CostomerChat from "../UI/CostomerChat";

const InnerLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      <CostomerChat />
      <Footer />
    </div>
  );
};

export default InnerLayout;
