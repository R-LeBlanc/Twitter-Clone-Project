import React from "react";
import styled from "styled-components";

import TweetComponent from "./TweetComponent";
import { CurrentUserContext } from "./CurrentUserContext";
import { TweetContext } from "./TweetContext";
import { COLORS } from "../constants";
import Post from "./HomePost";
import ServerError from "./serverErrorComponent";

const HomeFeed = () => {
  // TODO: in the API documentation, find the correct endpoint
  // fetch data, pass the data to the TweetComponent and use the results to render an array of Tweets
  // Create a tweet component that takes the data for a single Tweet, and renders the appropriate UI

  const {
    tweetState,
    tweetActions: {
      recieveTweetsFromServer,
      recieveLikeInfoFromServer,
      errorRecievedFromServer,
    },
  } = React.useContext(TweetContext);
  const [loading, setLoading] = React.useState(true);

  // console.log(tweetState);
  // const [isLiked, setIsLiked] = React.useState({});
  // const isLiked = [];

  // if (loading === false) {
  //   tweetState.homeFeedIds.map((id) => {
  //     console.log({ [id]: false });
  //     // setIsLiked({ ...isLiked, [id]: false });
  //     isLiked.push({ [id]: false });
  //   });
  // console.log(tweetState.isLiked);
  // }

  React.useEffect(() => {
    fetch("api/me/home-feed")
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        recieveTweetsFromServer(data);
        recieveLikeInfoFromServer(data);
        setLoading(false);
      })
      .catch((error) => {
        errorRecievedFromServer(error);
      });
  }, [tweetState]);

  // console.log(tweetState.error);

  if (tweetState.error) {
    return (
      <>
        <ServerError />
      </>
    );
  } else {
    return (
      <Wrapper>
        <Post loading={loading} />
        <TweetComponent loading={loading} />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  border-left: 1px solid lightgray;
  flex: 1;
`;

export default HomeFeed;
