import React from "react";
import styled from "styled-components";

import { TweetContext } from "./TweetContext";
import LikeButton from "./LikeButton";

import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";

const ActionBar = ({ tweet }) => {
  const {
    tweetState,
    // isLiked,
    // setIsLiked,
    numOfLikes,
    setNumOfLikes,
    tweetActions: { recieveLikeInfoFromServer },
  } = React.useContext(TweetContext);

  // const [isLiked, setIsLiked] = React.useState()
  // console.log(tweet);

  const handleLikeClick = () => {
    // console.log(tweetState);
    // console.log(tweetState.homeFeedTweets[tweet.id].isLiked);
    // console.log(tweet.id);
    // console.log(tweet.isLiked);
    // setIsLiked(tweetState.homeFeedTweets[tweet.id].isLiked);
    // isLiked == false ? setNumOfLikes(1) : setNumOfLikes(null);
    const request = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        like: !tweetState.homeFeedTweets[tweet.id].isLiked,
      }),
    };
    fetch(`/api/tweet/${tweet.id}/like`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // console.log(tweetState.homeFeedTweets[tweet.id]);
        // console.log(tweet.id);
        if (data.success === true) {
          recieveLikeInfoFromServer(tweet.id);
          // console.log(tweetState);
        }
      });
    // console.log(tweetState);
    // console.log(tweetState.homeFeedTweets[tweet.id].isLiked);
    // console.log(tweet.id);
  };

  return (
    <Wrapper>
      <FiMessageCircle />
      <FiRepeat />
      <LikeWrapper onClick={handleLikeClick}>
        <LikeButton tweet={tweet} />
      </LikeWrapper>
      <FiShare />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 35px;
`;

const LikeWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export default ActionBar;
