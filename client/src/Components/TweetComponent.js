import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { COLORS } from "../constants";
import ActionBar from "./ActionBar";
import { TweetContext } from "./TweetContext";
import Header from "./TweetHeader";

import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";

const TweetComponent = ({ loading }) => {
  let navigate = useNavigate();
  const {
    tweetState,
    tweetActions: { recieveTweetsFromServer, recieveLikeInfoFromServer },
  } = React.useContext(TweetContext);

  const handleClickTweet = (event, id, displayName) => {
    // console.log(event.target.innerHTML);
    if (event.target.innerHTML !== displayName) {
      navigate(`/tweet/${id}`);
    }
  };

  const handleClickLike = (id) => {
    // console.log(id);
    const request = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        like: !tweetState.homeFeedTweets[id].isLiked,
      }),
    };
    fetch(`/api/tweet/${id}/like`, request)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.success === true) {
          recieveLikeInfoFromServer(id);
          // console.log(tweetState);
          // console.log(tweetState.homeFeedTweets[id].isLiked);
        }
      });
  };

  return (
    <Wrapper>
      {loading && (
        <LoadingWrapper>
          <Loading>
            <div></div>
            <div></div>
          </Loading>
        </LoadingWrapper>
      )}
      {/* Once the data has finished loading in HomeFeed,
       map through the fetched data and render a tweet fo every "tweetsById" */}
      {!loading &&
        (tweetState.homeFeedIds
          ? tweetState.homeFeedIds.map((id) => {
              return (
                // can't have nested Links, so create an onCLick event that
                // with use "useNavigate" to direct the user to the TweetDetails page
                <Tweet key={id}>
                  <ClickableArea
                    onClick={(event) =>
                      handleClickTweet(
                        event,
                        id,
                        tweetState.homeFeedTweets[id].author.displayName
                      )
                    }
                  >
                    {tweetState.homeFeedTweets[id].retweetFrom ? (
                      <Retweet>
                        <FiRepeat />{" "}
                        {tweetState.homeFeedTweets[id].retweetFrom.displayName}{" "}
                        Remeowed
                      </Retweet>
                    ) : (
                      ""
                    )}
                    <Header
                      avatarSrc={tweetState.homeFeedTweets[id].author.avatarSrc}
                      displayName={
                        tweetState.homeFeedTweets[id].author.displayName
                      }
                      userName={tweetState.homeFeedTweets[id].author.handle}
                      timeStamp={tweetState.homeFeedTweets[id].timestamp}
                    />
                    <Status>{tweetState.homeFeedTweets[id].status}</Status>
                    {tweetState.homeFeedTweets[id].media.length > 0 ? (
                      <Media src={tweetState.homeFeedTweets[id].media[0].url} />
                    ) : (
                      ""
                    )}
                  </ClickableArea>
                  <ActionWrapper>
                    <FiMessageCircle />
                    <FiRepeat />
                    <LikeWrapper
                      onClick={() => {
                        handleClickLike(id);
                      }}
                    >
                      <Heart
                        style={{
                          color: tweetState.homeFeedTweets[id].isLiked
                            ? "red"
                            : "",
                        }}
                      />
                    </LikeWrapper>
                    <FiShare />
                  </ActionWrapper>
                  {/* <ActionBar tweet={tweetState.homeFeedTweets[id]} /> */}
                </Tweet>
              );
            })
          : "")}
    </Wrapper>
  );
};

export default TweetComponent;

const Wrapper = styled.div`
  max-width: 80%;
`;

const Tweet = styled.div`
border: 1px solid ${COLORS.tertiary}
  /* background-color: ${COLORS.primaryLight}; */
  margin: 50px 0;
  padding: 15px 30px;
  position: relative;
`;

const ClickableArea = styled.div``;

const Retweet = styled.div`
  font-size: 0.7rem;
  padding-bottom: 15px;
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 35px;
`;

const Heart = styled(FiHeart)``;

const LikeWrapper = styled.div``;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100%;
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
