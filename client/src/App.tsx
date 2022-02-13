import { inject, observer } from "mobx-react";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import ActorsPage from "./pages/Actors/Actors";
import GoogleLoginPage from "./pages/google-login-callback/google-login-callback";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import ProfilePage from "./pages/Profile/Profile";
import ReviewPage from "./pages/Review/Review";
import SignupPage from "./pages/Signup/Signup";
import AppStore from "./Store";

@inject("appStore")
@observer
export default class App extends React.Component<{
  appStore?: AppStore;
}> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path={ActorsPage.url} component={ActorsPage} />
          <Route exact path={LoginPage.url} component={LoginPage} />
          <Route exact path={SignupPage.url} component={SignupPage} />
          <Route exact path={ProfilePage.url} component={ProfilePage} />
          <Route exact path={`${ReviewPage.url}/:id`} component={ReviewPage} />
          <Route exact path={`${ReviewPage.url}/player/:id`} component={ReviewPage} />
          {/* <Route component={() => <Redirect to="/" />} /> */}
          <Route exact path={GoogleLoginPage.url} component={GoogleLoginPage} />

        </Switch>
      </BrowserRouter>
    );
  }
}
