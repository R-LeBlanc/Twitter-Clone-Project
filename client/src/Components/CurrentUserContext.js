import React from "react";
import ServerError from "./serverErrorComponent";

// This will be used to subscribe to the data held within this context.
export const CurrentUserContext = React.createContext(null);

const initialState = {
  currentUser: null,
  loading: true,
  error: null,
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
    case "error-recieved-from-server": {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      // console.log("default, error");
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

  const errorRecievedFromServer = (error) => {
    return dispatch({ type: "error-recieved-from-server", ...error });
  };

  // Fetch the user data from the API
  React.useEffect(() => {
    fetch("/api/me/profile")
      // ^^^^ Only works if you have a proxy in you client/package.json "proxy": "http://localhost:31415",
      .then((res) => {
        // if there is an error in the res from the server then we're going to catch
        // it at the end and trigger the errorRecievedFromServer action
        if (!res.ok) {
          throw res;
        }
        return res.json();
        // console.log(res);
      })
      .then((data) => {
        recieveUserInfoFromServer(data);
      })
      .catch((error) => {
        // console.log(state.error);
        console.log("working");
        errorRecievedFromServer(error);
      });
  }, []);

  // console.log(state.error);
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
