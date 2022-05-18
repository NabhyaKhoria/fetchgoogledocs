import styles from "./App.module.css";
import React, { useEffect } from "react";
import { useState } from "react";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import useDrivePicker from "react-google-drive-picker";
import LandingPage from './components/LandingPage';
import { gapi } from "gapi-script";

const CLIENT_ID =
  "375126912161-62d6k427opqhicpp8sal7ci6kijaag3b.apps.googleusercontent.com";
const API_KEY = "AIzaSyARItV3Oe5QDa7_ulAK22e9gMJEl0xAn9k";
const SCOPES = "https://www.googleapis.com/auth/drive";

function App() {
  const [openPicker, data, authResponse] = useDrivePicker({
    onCancel: () => console.log("User closed picker with close/cancel button"),
  });
  const handleOpenPicker = () => {
    var accessToken = gapi.auth.getToken().access_token;
    openPicker({
      clientId: CLIENT_ID,
      developerKey: API_KEY,
      viewId: "DOCUMENTS",
      token: accessToken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };
  useEffect(() => {
    function Start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientID: CLIENT_ID,
        scope: SCOPES,
      });
    }
    gapi.load("client:auth2", Start);
  });

  useEffect(() => {
    // do anything with the selected/uploaded files
    console.log("Hi", data);
    if (data) {
      data.docs.map((i) => {
        // window.open("https://docs.google.com/document/d/" + i.id + "/edit", "_blank");
        let iframe = document.getElementById('iframe');
        iframe.src="https://docs.google.com/document/d/" + i.id + "/edit";
        return console.log(i);
      });
      console.log("Why");
    }
  }, [data]);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const loggedInHandler = props => {
    if(props){
      setIsUserLoggedIn(true);
    }
  };

  const loggedOutHandler = props => {
    if(props){
      setIsUserLoggedIn(false);
      window.location.reload(false);
    }
  };

  return (
    <div className={styles.App}>
      { !isUserLoggedIn && <LandingPage />}
      { !isUserLoggedIn && <LoginButton onLoggedIn = {loggedInHandler}/> }
      { isUserLoggedIn && <LogoutButton onLoggedOut = {loggedOutHandler} /> }
      { isUserLoggedIn && <button onClick={handleOpenPicker} id={styles['customBtn']}><span className={styles.buttonText}>Fetch A Doc</span></button> }
      <br />
      {data && 
      <iframe title="doc view" className={styles['iframe-doc']} id="iframe"></iframe> }
    </div>
  );
}

export default App;
