/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Amplify from "aws-amplify";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import awsExports from "./aws-exports";
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";

ReactDOM.render(
  <ReactPWAInstallProvider enableLogging>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReactPWAInstallProvider>,
  document.getElementById("root")
);

const awsConfiguration: any = awsExports;
awsConfiguration["authenticationFlowType"] = "USER_PASSWORD_AUTH";

Amplify.configure(awsConfiguration);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
