import React from "react";
import styled from "styled-components";

import TweetComponent from "./TweetComponent";
import { CurrentUserContext } from "./CurrentUserContext";
import { TweetContext } from "./TweetContext";
import { COLORS } from "../constants";
import Post from "./HomePost";

const HomeFeed = () => {
  // TODO: in the API documentation, find the correct endpoint
  // fetch data, pass the data to the TweetComponent and use the results to render an array of Tweets
  // Create a tweet component that takes the data for a single Tweet, and renders the appropriate UI

  const {
    state,
    actions: { recieveTweetsFromServer },
  } = React.useContext(TweetContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        recieveTweetsFromServer(data);
        setLoading(false);
      });
  }, []);

  // map through the fetched data and render a tweet fo every "tweetsById"
  return (
    <Wrapper>
      <Post loading={loading} />
      {/* <WriteTweet>
        <h1>Home</h1>
        <Avatar src={state.currentUser.avatarSrc} />
        <WritingArea
          placeholder="What's happening?"
          rows="10"
          cols="40"
        ></WritingArea>
      </WriteTweet> */}
      {/* {loading && (
        <LoadingWrapper>
          <Loading>
            <div></div>
            <div></div>
          </Loading>
        </LoadingWrapper>
      )} */}
      {/* {!loading && <TweetComponent />} */}
      <TweetComponent loading={loading} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-left: 1px solid ${COLORS.tertiary};
  flex: 1;
  /* background-color: lightpink; */
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* width: 100vw; */
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

div {
  position: absolute;
  border: 4px solid ${COLORS.secondary};
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

export default HomeFeed;
