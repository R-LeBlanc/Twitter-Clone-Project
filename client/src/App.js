import logo from "./logo.svg";
import React from "react";
import { Route, Routes } from "react-router";

import HomeFeed from "./Components/HomeFeed";
import Notifications from "./Components/Notifications";
import Bookmarks from "./Components/Bookmarks";
import TweetDetails from "./Components/TweetDetails";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <div>Hello World!</div>
      <Routes>
        <Route exact path="/" element={<HomeFeed />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/tweet/:tweetId" element={<TweetDetails />} />
        <Route path="/:profileId" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
