import React from "react";

export const TweetContext = React.createContext(null);

const initialState = {
  homeFeedTweets: null,
  homeFeedIds: null,
};

function reducer(tweetState, tweetAction) {
  switch (tweetAction.type) {
    case "recieve-tweets-from-server": {
      return {
        ...tweetState,
        homeFeedTweets: tweetAction.tweetsById,
        homeFeedIds: tweetAction.tweetIds,
      };
    }
    case "recieve-like-info-from-server": {
      return {
        ...tweetState,
        id: tweetAction.data,
      };
    }
    default:
      throw new Error(`Unrecognized tweetAction: ${tweetAction.type}`);
  }
}

export const TweetProvider = ({ children }) => {
  const [tweetState, dispatch] = React.useReducer(reducer, initialState);
  // const [isLiked, setIsLiked] = React.useState();
  const [numOfLikes, setNumOfLikes] = React.useState(null);

  const recieveTweetsFromServer = (data) => {
    return dispatch({ type: "recieve-tweets-from-server", ...data });
  };

  const recieveLikeInfoFromServer = (data) => {
    // console.log("now here");
    // We're passing the id into recieveLikeInfoFromServer which is not an object
    // so it cannot be spread "..."
    return dispatch({ type: "recieve-like-info-from-server", data });
  };

  return (
    <TweetContext.Provider
      value={{
        // handleLikeClick,
        numOfLikes,
        setNumOfLikes,
        // isLiked,
        // setIsLiked,
        tweetState,
        tweetActions: { recieveTweetsFromServer, recieveLikeInfoFromServer },
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
