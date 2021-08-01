import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./api/store.js";
import App from "./App";
import "./api/i18n";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback="Loading">
        <App />
      </Suspense>
    </Provider>
  </StrictMode>,
  rootElement
);
