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
    default:
      throw new Error(`Unrecognized tweetAction: ${tweetAction.type}`);
  }
}

export const TweetProvider = ({ children }) => {
  const [tweetState, dispatch] = React.useReducer(reducer, initialState);

  const recieveTweetsFromServer = (data) => {
    return dispatch({ type: "recieve-tweets-from-server", ...data });
  };

  return (
    <TweetContext.Provider
      value={{
        tweetState,
        tweetActions: { recieveTweetsFromServer },
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
