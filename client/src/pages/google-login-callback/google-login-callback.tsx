import { inject, observer } from "mobx-react";
import queryString from 'query-string';
import React from "react";
import AppStore from "../../Store";
import HomePage from "../Home/Home";
import LoginPage from "../Login/Login";


@inject("appStore")
@observer
export default class GoogleLoginPage extends React.Component<{
  appStore: AppStore;
  history: any;
  location: any;
}> {

  public static url: string = "/google-callback"; 

  componentDidMount() {

  const query:any = queryString.parse(this.props.location.search);
  if(query&& query.token){
    localStorage.setItem('token', query.token);
    this.props.history.push(HomePage.url);
    return;
  }
    this.props.history.push(LoginPage.url);

  }


  render() {
    return (
      <div>
      </div>
    )
  }
}
