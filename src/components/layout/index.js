import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./styles.module.scss";
import MessengerCustomerChat from "react-messenger-customer-chat";

const InnerLayout = ({ toggleTheme, theme }) => {
  return (
    <div className={styles.container}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      <Footer />
      <MessengerCustomerChat
        pageId="100091334610479"
        appId="792875765800347"
        logged_in_greeting="Hi! How can we help you today?"
        logged_out_greeting="Hi! Please log in to chat with us."
        greeting_dialog_display="hide"
      />
    </div>
  );
};

export default InnerLayout;
