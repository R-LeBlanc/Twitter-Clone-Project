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
import { CurrentUserContext } from "./Components/CurrentUserContext";

import loadingBackground from "./assets/critterLoading.jpg";

function App() {
  // console.log("App running");
  const {
    state,
    actions: { recieveUserInfoFromServer },
  } = React.useContext(CurrentUserContext);

  console.log(state);

  return (
    <>
      <GlobalStyles />
      {state.loading && (
        <Loading>Loading! don't get your whiskers in a knot!</Loading>
      )}
      {!state.loading && (
        <Wrapper>
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<HomeFeed />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tweet/:tweetId" element={<TweetDetails />} />
            {/* MAKE SURE TO REPLACE THIS WITH "/:profileId" */}
            <Route path="/:profileId" element={<Profile />} />
          </Routes>
        </Wrapper>
      )}
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
`;

const Loading = styled.div`
  background-image: url(${loadingBackground});
  color: white;
  display: flex;
  font-size: 4rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
