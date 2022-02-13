import { Button, Modal, Table } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import Header from "../../components/Header/Header";
import AppStore from "../../Store";
import "./Review.scss";
import ReviewService from "../../core/services/review";
import HomePage from "../Home/Home";
import ActorsPage from "../Actors/Actors";

@inject("appStore")
@observer
export default class ReviewPage extends React.Component<{
  appStore: AppStore;
  history: any;
  match: any;
}> {

  public static url: string = "/review";

  private reviewService: ReviewService = new ReviewService();

  private columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Comments',
      dataIndex: 'reviewDescp',
      key: 'reviewDescp',
    }
  ];

  state = {
    reviews: [],
  }

  componentDidMount() {
    if ((this.props.match.path).includes("player")) {
      this.getPlayerReviews();
    }else{
      this.getReviews();
    }

  }

  private getReviews = async () => {
    try {
      const reviews = await this.reviewService.getReviews(this.props.match.params.id);
      this.setState({
        reviews
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Something went wrong.",
      });
    }

  }

  private getPlayerReviews = async () => {
    try {
      const reviews = await this.reviewService.getPlayerReviews(this.props.match.params.id);
      this.setState({
        reviews
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Something went wrong.",
      });
    }
  }

  private handleClickGoBack = () => {
    console.log("this.props.match", (this.props.match));

    if ((this.props.match.path).includes("player")) {
      this.props.history.push(`${ActorsPage.url}`)
    }else{
      this.props.history.push(`${HomePage.url}`)
    }

  }

  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <div className="container mt-4">
          <Table rowKey="id" dataSource={this.state.reviews} columns={this.columns} />
          <Button type="primary" align-items="right" onClick={() => this.handleClickGoBack()}>Go Back</Button>
        </div>

      </div>
    )
  }
}
