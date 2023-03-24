import loadScript from "load-script";

export default function load(appId) {
  if (!window.fbAsyncInit) {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        xfbml: true,
        version: "v11.0",
      });
    };
    loadScript(
      "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js",
      {
        async: true,
      },
      () => {}
    );
  }
}
