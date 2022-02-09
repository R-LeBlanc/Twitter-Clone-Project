import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";
import { TweetContext } from "./TweetContext";
import { CurrentUserContext } from "./CurrentUserContext";
import { ProfileContext } from "./ProfileContext";

const Post = ({ loading }) => {
  const {
    state,
    actions: { recieveUserInfoFromServer },
  } = React.useContext(CurrentUserContext);

  const {
    tweetState,
    tweetActions: { recieveTweetsFromServer },
  } = React.useContext(TweetContext);

  const [post, setPost] = React.useState(null);

  const onPostChange = (event) => {
    // console.log(event.target.value);
    setPost(event.target.value);
  };

  const handleClickPost = () => {
    console.log(post);
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: post }),
    };
    fetch("/api/tweet", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  // console.log(state);

  return (
    <Wrapper>
      {state.loading && (
        <LoadingWrapper>
          <Loading>
            <div></div>
            <div></div>
          </Loading>
        </LoadingWrapper>
      )}
      {!state.loading && (
        <>
          <Title>Home</Title>
          <Avatar src={state.currentUser.avatarSrc} />
          <form>
            <WritingArea
              placeholder="What's happening?"
              rows="10"
              cols="55"
              onChange={onPostChange}
            ></WritingArea>
            <Submit
              type="submit"
              onClick={(event) => handleClickPost(event.target.value)}
            >
              Meow
            </Submit>
          </form>
        </>
      )}
    </Wrapper>
  );
};

export default Post;

const Wrapper = styled.div``;

const Title = styled.div`
  font-size: 2rem;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const WritingArea = styled.textarea`
  /* border: none; */
  font-size: 1rem;
  resize: none;
`;

const Submit = styled.button``;

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
