import React from "react";
import StreamrClient from "streamr-client";

interface AppState {
  streamrClient: StreamrClient;
}

interface SetStreamrClient {
  streamrClient: StreamrClient;
}

type AppAction = {
  type: "SetStreamrClient";
  payload: any;
};

// Use https://www.npmjs.com/package/immer for state modification
export const appReducer: React.Reducer<AppState, AppAction> = (
  state,
  action
) => {
  if (action.type === "SetStreamrClient") {
    return {
      streamrClient: action.payload,
    };
  }

  return state;
};

export interface AppContext {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const INITIAL_APP_STATE: AppState = {
  streamrClient: new StreamrClient(),
};

export const appContext = React.createContext<AppContext>({
  state: INITIAL_APP_STATE,
  dispatch: () => undefined,
});
