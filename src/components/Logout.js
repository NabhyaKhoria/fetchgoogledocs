import React from "react";
import { GoogleLogout } from "react-google-login";
import styles from "./Logout.module.css";

const clientID =
  "375126912161-62d6k427opqhicpp8sal7ci6kijaag3b.apps.googleusercontent.com";

const Logout = (props) => {
  const onSuccess = () => {
    props.onLoggedOut(true);
    return console.log("Log Out Successful");
  };
  return (
    <div id="signOutButton">
      <GoogleLogout
        className={styles['logout-btn']}
        clientId={clientID}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
