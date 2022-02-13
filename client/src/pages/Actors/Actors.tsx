import { Button, Form, Input, Modal, Table } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import Header from "../../components/Header/Header";
import AppStore from "../../Store";
import { LikeOutlined } from '@ant-design/icons';

import "./Actors.scss";
import PlayerService from "../../core/services/player";
import ReviewPage from "../Review/Review";
import ReviewService from "../../core/services/review";

@inject("appStore")
@observer
export default class ActorsPage extends React.Component<{
  appStore: AppStore;
  history: any
}> {

  public static url: string = "/actors";

  private playerService:PlayerService = new PlayerService();
  private reviewService:ReviewService = new ReviewService();


  private columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      hidden:true
    },
    {
      title: 'Actor Name',
      dataIndex: 'playerName',
      key: 'playerName',
    },
    {
      title: " ",
      dataIndex: "likeCount",
      key: "like",
      render: (text: any, player: any) => <div>
        <Button type="link" onClick={() => this.handleClickLikePlayer(player.id, player.likeCount)} icon={<LikeOutlined />} />
        {player.likeCount}
      </div>
    },
    {
      title: " ",
      dataIndex: "comment",
      key: "comment",
      render: (text: any, player: any) => <Button type="primary" onClick={() => this.handleClickAddComment(player.id)}>Add Comment</Button>
    },
    {
      title: "",
      dataIndex: "comments",
      key: "comments",
     render: (text: any, player: any) => <Button type="primary" onClick={() => this.props.history.push(`${ReviewPage.url}/player/${player.id}`)}>See Comments</Button>
    }
  ].filter(item => !item.hidden);

  state = {
    players: [],
    isCommentModalVisible: false,
    selectedPlayerId: 0
  }

  componentDidMount() {
    this.getPlayers();
  }

  private getPlayers = async () => {
    try {
      const players = await this.playerService.getPlayers();
      this.setState({
        players
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Something went wrong.",
      });
    }
  }

  private handleClickAddComment = (id: number) => {
    this.setState({
      isCommentModalVisible: true,
      selectedPlayerId: id
    });

  }

  private handleSaveComment = async (values: any) => {
    console.log(values);

    try {
      await this.reviewService.postPlayerComment(this.state.selectedPlayerId, values.comment);
      this.setState({
        isCommentModalVisible: false
      });
    } catch (error) {

    }
  }

  private handleClickLikePlayer = async (id: number, likeCount:number) => {

    this.setState({
      isCreateModalVisible: false
    });

    try {
      await this.playerService.likePlayer(id, likeCount);
      this.setState({
        isCreateModalVisible: false
      });
      this.getPlayers();
    } catch (error) {

    }
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <div className="container">
          <Table rowKey="id" dataSource={this.state.players} columns={this.columns} />
          <Modal
            visible={this.state.isCommentModalVisible}
            footer={false}
            onCancel={() => this.setState({ isCommentModalVisible: false })}>
            <Form
              layout="vertical"
              onFinish={this.handleSaveComment}
            >
              <Form.Item
                label="Comment"
                name="comment"
                rules={[{ required: true, message: 'Please write your comment!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}
