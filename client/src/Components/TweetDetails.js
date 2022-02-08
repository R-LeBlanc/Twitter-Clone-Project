import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";
import { useParams } from "react-router-dom";
import { TweetContext } from "./TweetContext";
import ActionBar from "./ActionBar";
import Header from "./TweetHeader";

const TweetDetails = () => {
  const { tweetId } = useParams();
  const {
    state,
    actions: { recieveTweetsFromServer },
  } = React.useContext(TweetContext);

  return (
    <>
      <Tweet>
        <Header
          avatarSrc={state.homeFeedTweets[tweetId].author.avatarSrc}
          displayName={state.homeFeedTweets[tweetId].author.displayName}
          userName={state.homeFeedTweets[tweetId].author.handle}
          timeStamp={state.homeFeedTweets[tweetId].timestamp}
        />
        <Status>{state.homeFeedTweets[tweetId].status}</Status>
        {state.homeFeedTweets[tweetId].media.length > 0 ? (
          <Media src={state.homeFeedTweets[tweetId].media[0].url} />
        ) : (
          ""
        )}
        <ActionBar />
      </Tweet>
    </>
  );
};

export default TweetDetails;

const Tweet = styled.div`
border: 1px solid ${COLORS.tertiary}
  /* background-color: ${COLORS.primaryLight}; */
  margin: 50px 0;
  padding: 15px 30px;
`;

const Status = styled.div`
  padding: 0 0 25px 60px;
`;

const Media = styled.img`
  border-radius: 20px;
  max-width: 80%;
  position: relative;
  left: 60px;
`;
