import React from "react";
import { GoogleLogin } from "react-google-login";
import styles from "./Login.module.css";

const clientID =
  "375126912161-62d6k427opqhicpp8sal7ci6kijaag3b.apps.googleusercontent.com";

  
    
const Login = (props) => {

    const onSuccess = (res) => {
      console.log(res);
      console.log("LOGIN SUCCESS, Current User: ", res.profileObj);
      props.onLoggedIn(true);
      
    };

    const onFailure = (res) => {
        console.log(res);
        console.log("LOGIN FAILED");
      props.onLoggedIn(false);
      };

  return (
    <div id="signInButton">
      <GoogleLogin
        className={styles['login-btn']}
        clientId={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
};

export default Login;
