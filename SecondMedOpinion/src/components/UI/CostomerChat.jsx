import { useEffect } from "react";
import load from "../../facebook";

let initialized = false;

const CostomerChat = () => {
  const appId = process.env.REACT_APP_APP_ID;
  const pageId = process.env.REACT_APP_PAGE_ID;
  const timeToShow = 500;

  useEffect(() => {
    if (!initialized) {
      var chatBox = document.getElementById("fb-customer-chat");

      if (chatBox) {
        chatBox.setAttribute("page_id", pageId);
        chatBox.setAttribute("attribution", "biz_inbox");
      }

      let timeout = setTimeout(() => load(appId), timeToShow);
      initialized = true;

      return () => clearTimeout(timeout);
    }
  }, [appId, pageId]);

  useEffect(() => {
    const fbRoot = document.getElementById("fb-root");
    fbRoot.style = "display:block";

    return () => (fbRoot.style = "display:none");
  }, []);

  return null;
};

export default CostomerChat;
