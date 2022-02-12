import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";
import { useParams } from "react-router-dom";
import { TweetContext } from "./TweetContext";
import ActionBar from "./ActionBar";
import Header from "./TweetHeader";

import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";

const TweetDetails = () => {
  const { tweetId } = useParams();
  const {
    tweetState,
    tweetActions: { recieveTweetsFromServer },
  } = React.useContext(TweetContext);

  return (
    <Wrapper>
      <Tweet>
        <Header
          avatarSrc={tweetState.homeFeedTweets[tweetId].author.avatarSrc}
          displayName={tweetState.homeFeedTweets[tweetId].author.displayName}
          userName={tweetState.homeFeedTweets[tweetId].author.handle}
          timeStamp={tweetState.homeFeedTweets[tweetId].timestamp}
        />
        <Status>{tweetState.homeFeedTweets[tweetId].status}</Status>
        {tweetState.homeFeedTweets[tweetId].media.length > 0 ? (
          <Media src={tweetState.homeFeedTweets[tweetId].media[0].url} />
        ) : (
          ""
        )}
        <ActionWrapper>
          <FiMessageCircle />
          <FiRepeat />
          <LikeWrapper
          // onClick={() => {
          //   handleClickLike(tweetId);
          // }}
          >
            <Heart
              style={{
                color: tweetState.homeFeedTweets[tweetId].isLiked ? "red" : "",
              }}
            />
          </LikeWrapper>
          <FiShare />
        </ActionWrapper>
        {/* <ActionBar tweet={tweetState.homeFeedTweets[tweetId]} /> */}
      </Tweet>
    </Wrapper>
  );
};

export default TweetDetails;

const Wrapper = styled.div`
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  height: 100vh;
`;

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

const ActionWrapper = styled.div`
  background-color: ${COLORS.secondary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  margin-top: 30px;
`;

const Heart = styled(FiHeart)``;

const LikeWrapper = styled.div``;
