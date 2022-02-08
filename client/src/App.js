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
import { COLORS } from "./constants";

import loadingBackground from "./assets/critterLoading.jpg";

function App() {
  // console.log("App running");
  const {
    state,
    actions: { recieveUserInfoFromServer },
  } = React.useContext(CurrentUserContext);

  // console.log(state.loading);

  return (
    <>
      <GlobalStyles />
      {/* <Loading>
        <div></div>
        <div></div>
      </Loading> */}
      {state.loading && (
        <LoadingWrapper>
          <Loading>
            <div></div>
            <div></div>
          </Loading>
        </LoadingWrapper>
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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

div {
  position: absolute;
  border: 4px solid ${COLORS.primary};
  opacity: 1;
  border-radius: 50%;
  animation: Loading 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
&:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes Loading {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;
