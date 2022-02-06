import React from "react";
import styled from "styled-components";

import TweetComponent from "./TweetComponent";

const HomeFeed = () => {
  // TODO: in the API documentation, find the correct endpoint
  // fetch data, pass the data to the TweetComponent and use the results to render an array of Tweets
  // Create a tweet component that takes the data for a single Tweet, and renders the appropriate UI
  const [homeFeedTweets, setHomeFeedTweets] = React.useState(null);
  const [homeFeedIds, setHomeFeedIds] = React.useState(null);

  React.useEffect(() => {
    fetch("api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.tweetsById);
        setHomeFeedTweets(data.tweetsById);
        setHomeFeedIds(data.tweetIds);
      });
  }, []);

  // map through the fetched data and render a tweet fo every "tweetsById"
  return (
    <Wrapper>
      Home
      <TweetComponent
        homeFeedTweets={homeFeedTweets}
        homeFeedIds={homeFeedIds}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  /* background-color: lightpink; */
`;

export default HomeFeed;
