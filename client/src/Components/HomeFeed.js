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
    isLiked,
    setIsLiked,
    tweetState,
    tweetActions: { recieveTweetsFromServer, recieveLikeInfoFromServer },
  } = React.useContext(TweetContext);
  const [loading, setLoading] = React.useState(true);

  // console.log(tweetState);

  React.useEffect(() => {
    fetch("api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        recieveTweetsFromServer(data);
        // recieveLikeInfoFromServer(data);
        setLoading(false);
      });
  }, []);

  return (
    <Wrapper>
      <Post loading={loading} />
      <TweetComponent loading={loading} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-left: 1px solid ${COLORS.tertiary};
  flex: 1;
  /* background-color: lightpink; */
`;

export default HomeFeed;
