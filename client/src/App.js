import React from "react";
import { Route, Routes } from "react-router";

import HomeFeed from "./Components/HomeFeed";
import Notifications from "./Components/Notifications";
import Bookmarks from "./Components/Bookmarks";
import TweetDetails from "./Components/TweetDetails";
import Profile from "./Components/Profile";
import Sidebar from "./Components/Sidebar";

import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<HomeFeed />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/tweet/:tweetId" element={<TweetDetails />} />
        {/* MAKE SURE TO REPLACE THIS WITH "/:profileId" */}
        <Route path="/profile/abc" element={<Profile />} />
      </Routes>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
`;
