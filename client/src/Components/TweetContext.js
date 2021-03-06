import React from "react";

export const TweetContext = React.createContext(null);

const initialState = {
  homeFeedTweets: null,
  homeFeedIds: null,
  error: null,
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
      // Now we have an object of the isLiked values
      // that can be called and changed anywhere in the app
      const isLiked = {};
      tweetState.homeFeedIds.map((id) => {
        // console.log({ [id]: false });
        isLiked[id] = false;
      });
      return {
        ...tweetState,
        isLiked,
      };
    }
    case "error-recieved-from-server": {
      return {
        ...tweetState,
        loading: false,
        error: true,
      };
    }
    default:
      throw new Error(`Unrecognized tweetAction: ${tweetAction.type}`);
  }
}

export const TweetProvider = ({ children }) => {
  const [tweetState, dispatch] = React.useReducer(reducer, initialState);

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

  const errorRecievedFromServer = (error) => {
    return dispatch({ type: "error-recieved-from-server", ...error });
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
        tweetActions: {
          recieveTweetsFromServer,
          recieveLikeInfoFromServer,
          errorRecievedFromServer,
        },
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
