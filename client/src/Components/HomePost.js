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
    tweetActions: { recieveTweetsFromServer, errorRecievedFromServer },
  } = React.useContext(TweetContext);

  const [post, setPost] = React.useState(null);
  const [counter, setCounter] = React.useState(280);
  const seed = 280;
  // creat a function that counts down from 280 for every
  // character in the text area
  // use regex with the \s quantifier to ignore all white
  // space(new lines, spaces, tabs) ex. /\s/g
  const characterCounter = (event) => {
    let textArray = event.target.value.replace(/\s/g, "").length;
    // console.log(textArray);
    setCounter(seed - textArray);
    return counter;
  };

  const onPostChange = (event) => {
    setPost(event.target.value);
    // call characterCounter here
    characterCounter(event);
  };

  const handleClickPost = () => {
    if (counter > 0) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: post }),
      };
      fetch("/api/tweet", request)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        // .then((data) => {
        //   // console.log(data);
        // });
        .catch((error) => {
          // console.log(state.error);
          errorRecievedFromServer(error);
        });
    } else {
      alert("Please keep your message under 280 characters");
    }
  };

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
          <form>
            <PostWrapper>
              <Avatar src={state.currentUser.avatarSrc} />
              <WritingArea
                placeholder="What's happening?"
                rows="10"
                // cols="55"
                onChange={onPostChange}
              ></WritingArea>
            </PostWrapper>
            <SubmitWrapper>
              <Submit
                type="submit"
                onClick={(event) => handleClickPost(event.target.value)}
              >
                Meow
              </Submit>
              <Counter
                style={{
                  color: counter < 0 ? "red" : counter <= 55 ? "#ffbf33" : "",
                }}
              >
                {counter}
              </Counter>
            </SubmitWrapper>
          </form>
        </>
      )}
    </Wrapper>
  );
};

export default Post;

const Wrapper = styled.div`
  border-bottom: 7px solid lightgray;
  border-right: 1px solid lightgray;
  margin: 10px 0;
  padding: 15px 30px;
  max-width: 80%;
`;

const Title = styled.div`
  /* background-image: linear-gradient(
    45deg,
    ${COLORS.primary},
    ${COLORS.tertiary}
  ); */
  /* border-radius: 15px; */
  /* color: white; */
  font-size: 2rem;
  border-bottom: 1px solid lightgray;
  padding: 15px 10px;
`;

const PostWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  margin-top: 15px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
`;

const WritingArea = styled.textarea`
  border: none;
  font-size: 1rem;
  resize: none;
  width: 80%;
`;

const SubmitWrapper = styled.div`
  align-content: flex-end;
  align-items: center;
  display: flex;
`;

const Counter = styled.div`
  color: lightgray;
`;

const Submit = styled.button`
  background-color: ${COLORS.primary};
  border: none;
  border-radius: 30px;
  color: white;
  display: flex;
  font-weight: bold;
  justify-content: center;
  margin-right: 20px;
  padding: 15px 30px;
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
