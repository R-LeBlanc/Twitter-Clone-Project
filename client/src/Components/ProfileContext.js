import React from "react";
import styled from "styled-components";

export const ProfileContext = React.createContext(null);

const initialState = {
  profile: null,
  tweets: null,
  tweetIds: null,
};

function reducer(profileState, profileAction) {
  switch (profileAction.type) {
    case "recieve-profile-from-server": {
      return {
        ...profileState,
        profile: profileAction.profile,
      };
    }
    case "recieve-profile-tweets-from-server": {
      return {
        ...profileState,
        tweets: profileAction.tweetsById,
        tweetIds: profileAction.tweetIds,
      };
    }
    default:
      throw new Error(`Unrecognized profileAction: ${profileAction.type}`);
  }
}

export const ProfileProvider = ({ children }) => {
  const [profileState, dispatch] = React.useReducer(reducer, initialState);

  const recieveProfileFromServer = (data) => {
    return dispatch({ type: "recieve-profile-from-server", ...data });
  };

  const recieveProfileTweetsFromServer = (data) => {
    return dispatch({ type: "recieve-profile-tweets-from-server", ...data });
  };

  return (
    <ProfileContext.Provider
      value={{
        profileState,
        profileActions: {
          recieveProfileFromServer,
          recieveProfileTweetsFromServer,
        },
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
