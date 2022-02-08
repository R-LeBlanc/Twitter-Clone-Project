import React from "react";

export const TweetContext = React.createContext(null);

const initialState = {
  homeFeedTweets: null,
  homeFeedIds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "recieve-tweets-from-server": {
      return {
        ...state,
        homeFeedTweets: action.tweetsById,
        homeFeedIds: action.tweetIds,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const TweetProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const recieveTweetsFromServer = (data) => {
    return dispatch({ type: "recieve-tweets-from-server", ...data });
  };

  return (
    <TweetContext.Provider
      value={{
        state,
        actions: { recieveTweetsFromServer },
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
