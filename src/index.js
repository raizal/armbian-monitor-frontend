import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import 'react-toastify/dist/ReactToastify.min.css';

import store from './store'
import { Provider } from "react-redux";

// layouts

import Admin from "layouts/Admin.js";

// views without layouts

import Modal from "react-modal";

Modal.setAppElement('#root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/" component={Admin} />
        {/*<Route path="/auth" component={Auth} />*/}
        {/*/!* add routes without layouts *!/*/}
        {/*<Route path="/landing" exact component={Landing} />*/}
        {/*<Route path="/profile" exact component={Profile} />*/}
        <Route path="/" component={Admin} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
