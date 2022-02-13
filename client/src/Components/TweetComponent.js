import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { COLORS } from "../constants";
import ActionBar from "./ActionBar";
import { TweetContext } from "./TweetContext";
import Header from "./TweetHeader";
import ScaleIn from "./LikeButton/ScaleIn";

import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";

const TweetComponent = ({ loading }) => {
  let navigate = useNavigate();
  const {
    tweetState,
    tweetActions: { recieveTweetsFromServer, recieveLikeInfoFromServer },
  } = React.useContext(TweetContext);

  const handleClickTweet = (event, id, displayName) => {
    // console.log(event.key);
    if (event.target.innerHTML !== displayName || event.key === "Enter") {
      navigate(`/tweet/${id}`);
    }
  };

  const handleClickLike = (id) => {
    // in this handler we can perhaps toggle the value of isLiked
    // based on the id of the tweet that is clicked
    // console.log(tweetState.isLiked);

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
        // if (data.success === true) {
        // recieveLikeInfoFromServer(id);
        // console.log(tweetState);
        // console.log(tweetState.homeFeedTweets[id]);
        // }
      });
  };

  const handlePressLike = (event, id) => {
    // in this handler we can perhaps toggle the value of isLiked
    // based on the id of the tweet that is clicked
    tweetState.isLiked[id] = !tweetState.isLiked[id];
    // console.log(tweetState.isLiked);
    if (event.key === "Enter") {
      const request = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          like: !tweetState.homeFeedTweets[id].isLiked,
        }),
      };
      fetch(`/api/tweet/${id}/like`, request)
        .then((res) => res.json())
        .then((data) => {});
    }
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
                    tabIndex={0}
                    onKeyPress={(event) => {
                      handleClickTweet(event, id);
                    }}
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
                  <ActionWrapper tabIndex={0}>
                    <FiMessageCircle tabIndex={0} />
                    <FiRepeat tabIndex={0} />
                    <LikeWrapper
                      tabIndex={0}
                      onKeyPress={(event) => {
                        handlePressLike(event, id);
                      }}
                      onClick={() => {
                        handleClickLike(id);
                      }}
                    >
                      {/* {console.log(tweetState.isLiked[id])} */}
                      {tweetState.homeFeedTweets[id].isLiked ? (
                        <>
                          <ScaleIn>
                            <HeartFull
                              style={{ color: `${COLORS.tertiary}` }}
                            />
                          </ScaleIn>
                          <NumOfLikes>1</NumOfLikes>
                        </>
                      ) : (
                        <Heart />
                      )}
                    </LikeWrapper>
                    <FiShare tabIndex={0} />
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
  border-right: 1px solid lightgray;
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
  align-items: center;
  background-color: ${COLORS.secondary};
  /* background-image: linear-gradient(
    45deg,
    ${COLORS.primary},
    ${COLORS.tertiary}
  ); */
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  height: 50px;
  margin-top: 30px;
`;

const NumOfLikes = styled.div``;

const HeartFull = styled(MdFavorite)`
  font-size: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const Heart = styled(FiHeart)`
  &:hover {
    cursor: pointer;
  }
`;

const LikeWrapper = styled.div`
  display: flex;
`;

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
