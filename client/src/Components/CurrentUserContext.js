import React from "react";

// This will be used to subscribe to the data held within this context.
export const CurrentUserContext = React.createContext(null);

const initialState = {
  currentUser: null,
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "recieve-user-info-from-server": {
      //   console.log(action.profile);
      return {
        ...state,
        currentUser: action.profile,
        loading: false,
      };
    }
    default:
      console.log("default, error");
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

// The CurrentUserProvider is what actually makes this data available to the React app,
// so that components further down the tree can subscribe to it.
export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const recieveUserInfoFromServer = (data) => {
    return dispatch({ type: "recieve-user-info-from-server", ...data });
  };

  // Fetch the user data from the API
  React.useEffect(() => {
    fetch("/api/me/profile")
      // ^^^^ Only works if you have a proxy in you client/package.json "proxy": "http://localhost:31415",
      .then((res) => res.json())
      .then((data) => {
        // console.log("running");
        recieveUserInfoFromServer(data);
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        state,
        actions: { recieveUserInfoFromServer },
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
