import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./Components/CurrentUserContext";
import { TweetProvider } from "./Components/TweetContext";
import { ProfileProvider } from "./Components/ProfileContext";
import ServerError from "./Components/serverErrorComponent";

import App from "./App";

ReactDOM.render(
  <CurrentUserProvider>
    <TweetProvider>
      <ProfileProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProfileProvider>
    </TweetProvider>
  </CurrentUserProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
