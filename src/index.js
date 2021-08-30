import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./stateManagement/store";
import { Provider } from "react-redux";

//import { PersistGate } from "redux-persist/integration/react";
//import { persistStore } from "redux-persist";
//let persistor = persistStore(store);

ReactDOM.render(
  <>
    <Provider store={store}>
     
        <App />
     
    </Provider>
  </>,
  document.getElementById("root")
);
