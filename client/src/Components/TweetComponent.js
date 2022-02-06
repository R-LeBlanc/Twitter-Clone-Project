import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";

const TweetComponent = ({ homeFeedTweets, homeFeedIds }) => {
  // use the data passed from the HomeFeed to generate the tweet and the appropriat UI
  //   console.log(homeFeedTweets);
  //   console.log(homeFeedIds);
  //   if (homeFeedIds) {
  //     homeFeedIds.map((id) => {
  //       //   console.log(homeFeedTweets[id].media[0].url);
  //       if (homeFeedTweets[id].media.length > 0) {
  //         console.log(homeFeedTweets[id].media[0].url);
  //       }
  //     });
  //   }

  return (
    <>
      {homeFeedIds
        ? homeFeedIds.map((id) => {
            return (
              <Tweet>
                {homeFeedTweets[id].retweetFrom ? (
                  <Retweet>
                    {homeFeedTweets[id].retweetFrom.displayName} Remeowed
                  </Retweet>
                ) : (
                  ""
                )}
                <Avatar src={homeFeedTweets[id].author.avatarSrc} />
                <h2>{homeFeedTweets[id].author.displayName}</h2>
                <Handle>@{homeFeedTweets[id].author.handle}</Handle>
                <p>{homeFeedTweets[id].timestamp}</p>
                <p>{homeFeedTweets[id].status}</p>
                {homeFeedTweets[id].media.length > 0 ? (
                  <Media src={homeFeedTweets[id].media[0].url} />
                ) : (
                  ""
                )}
              </Tweet>
            );
          })
        : ""}
    </>
  );
};

export default TweetComponent;

const Tweet = styled.div`
  background-color: ${COLORS.secondary};
  margin: 50px 0;
`;

const Avatar = styled.img`
  border-radius: 100px;
  height: 50px;
`;

const Handle = styled.p`
  font-size: 0.7rem;
`;

const Media = styled.img`
  border-radius: 20px;
  max-width: 500px;
`;

const Retweet = styled.div`
  font-size: 0.7rem;
`;
