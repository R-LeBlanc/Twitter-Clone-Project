import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FiRepeat } from "react-icons/fi";
import { COLORS } from "../constants";
import ActionBar from "./ActionBar";
import { TweetContext } from "./TweetContext";
import Header from "./TweetHeader";

const TweetComponent = ({ loading }) => {
  let navigate = useNavigate();
  const {
    state,
    actions: { recieveTweetsFromServer },
  } = React.useContext(TweetContext);
  // const history = useHistory();
  // console.log(state);

  const handleClickTweet = (event, id, displayName) => {
    // console.log(event.target.innerHTML);
    // console.log(displayName);
    if (event.target.innerHTML !== displayName) {
      navigate(`/tweet/${id}`);
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
      {!loading &&
        (state.homeFeedIds
          ? state.homeFeedIds.map((id) => {
              return (
                <Tweet
                  onClick={(event) =>
                    handleClickTweet(
                      event,
                      id,
                      state.homeFeedTweets[id].author.displayName
                    )
                  }
                >
                  {/* <LinkComponent to={`/tweet/${id}`}> */}
                  {state.homeFeedTweets[id].retweetFrom ? (
                    <Retweet>
                      <FiRepeat />{" "}
                      {state.homeFeedTweets[id].retweetFrom.displayName}{" "}
                      Remeowed
                    </Retweet>
                  ) : (
                    ""
                  )}
                  <Header
                    avatarSrc={state.homeFeedTweets[id].author.avatarSrc}
                    displayName={state.homeFeedTweets[id].author.displayName}
                    userName={state.homeFeedTweets[id].author.handle}
                    timeStamp={state.homeFeedTweets[id].timestamp}
                  />
                  <Status>{state.homeFeedTweets[id].status}</Status>
                  {state.homeFeedTweets[id].media.length > 0 ? (
                    <Media src={state.homeFeedTweets[id].media[0].url} />
                  ) : (
                    ""
                  )}
                  <ActionBar />
                  {/* </LinkComponent> */}
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

const LinkComponent = styled(NavLink)``;

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
