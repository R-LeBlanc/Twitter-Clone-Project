import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";
import { useParams } from "react-router-dom";
import { TweetContext } from "./TweetContext";
import ActionBar from "./ActionBar";
import Header from "./TweetHeader";
import ScaleIn from "./LikeButton/ScaleIn";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { format } from "date-fns";

import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";

const TweetDetails = () => {
  let navigate = useNavigate();

  const { tweetId } = useParams();
  const {
    tweetState,
    tweetActions: { recieveTweetsFromServer },
  } = React.useContext(TweetContext);

  const handleClickProfile = (userName) => {
    // console.log(userName);
    navigate(`/${userName}`);
  };

  // console.log(tweetState.homeFeedTweets[tweetId]);

  return (
    <Wrapper>
      <Tweet tabIndex={0}>
        {/* <Header
          avatarSrc={tweetState.homeFeedTweets[tweetId].author.avatarSrc}
          displayName={tweetState.homeFeedTweets[tweetId].author.displayName}
          userName={tweetState.homeFeedTweets[tweetId].author.handle}
          timeStamp={tweetState.homeFeedTweets[tweetId].timestamp}
        /> */}
        <HeaderWrapper>
          <Avatar src={tweetState.homeFeedTweets[tweetId].author.avatarSrc} />
          <Name>
            <DisplayName
              tabIndex={0}
              // might be able to us NavLink here insterad of the onClick
              onClick={() =>
                handleClickProfile(
                  tweetState.homeFeedTweets[tweetId].author.handle
                )
              }
            >
              {tweetState.homeFeedTweets[tweetId].author.displayName}
            </DisplayName>
            <Username>
              @{tweetState.homeFeedTweets[tweetId].author.handle}
            </Username>
          </Name>
        </HeaderWrapper>
        <Status>{tweetState.homeFeedTweets[tweetId].status}</Status>
        {tweetState.homeFeedTweets[tweetId].media.length > 0 ? (
          <Media src={tweetState.homeFeedTweets[tweetId].media[0].url} />
        ) : (
          ""
        )}
        <TimeStamp>
          {format(
            new Date(tweetState.homeFeedTweets[tweetId].timestamp),
            "p LLL d yyy"
          )}{" "}
          Critter web app
        </TimeStamp>
        <ActionWrapper tabIndex={0}>
          <FiMessageCircle tabIndex={0} />
          <FiRepeat tabIndex={0} />
          <LikeWrapper
            tabIndex={0}
            // onClick={() => {
            //   handleClickLike(tweetId);
            // }}
          >
            {tweetState.homeFeedTweets[tweetId].isLiked ? (
              <ScaleIn>
                <HeartFull style={{ color: `${COLORS.tertiary}` }} />
              </ScaleIn>
            ) : (
              <Heart />
            )}
          </LikeWrapper>
          <FiShare tabIndex={0} />
        </ActionWrapper>
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

// **********************Tweet Head***********************

const HeaderWrapper = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Name = styled.div`
  justify-content: center;
  flex: 1;
  flex-direction: column;
  display: flex;
  height: 50px;
  padding: 0px 10px;
`;

const DisplayName = styled.div`
  font-size: 15px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const LinkComponent = styled(NavLink)``;

const Username = styled.div`
  font-size: 0.8rem;
  color: rgb(101, 119, 134);
  padding: 0 5px;
`;

const TimeStamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 0.8rem;
  margin-top: 5px;
  position: relative;
`;

// **********************Tweet body***********************

const Tweet = styled.div`
border: 1px solid ${COLORS.tertiary}
  margin: 50px 0;
  padding: 15px 30px;
`;

const Status = styled.div`
  font-size: 1.5rem;
  padding: 15px 0;
`;

const Media = styled.img`
  border-radius: 20px;
  max-width: 100%;
  position: relative;
`;

const ActionWrapper = styled.div`
  background-color: ${COLORS.secondary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  margin-top: 10px;
`;

const HeartFull = styled(MdFavorite)`
  font-size: 25px;
`;

const Heart = styled(FiHeart)``;

const LikeWrapper = styled.div``;
