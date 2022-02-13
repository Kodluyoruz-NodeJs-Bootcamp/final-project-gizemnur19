import { Button, Form, Input, Modal, Table } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import Header from "../../components/Header/Header";
import MovieService from "../../core/services/movie";
import AppStore from "../../Store";
import { LikeOutlined } from '@ant-design/icons';
import "./Home.scss";
import ReviewPage from "../Review/Review";
import ReviewService from "../../core/services/review";

@inject("appStore")
@observer
export default class HomePage extends React.Component<{
  appStore: AppStore;
  history: any
}> {

  public static url: string = "/";

  private movieService: MovieService = new MovieService();
  private reviewService:ReviewService = new ReviewService();


  private columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      hidden: true
    },
    {
      title: 'Movie Name',
      dataIndex: 'movieName',
      key: 'movieName',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: " ",
      dataIndex: "likeCount",
      key: "like",
      render: (text: any, movie: any) => <div>
        <Button type="link" onClick={() => this.handleClickLikeMovie(movie.id, movie.likeCount)} icon={<LikeOutlined />} />
        {movie.likeCount}
      </div>
    },
    {
      title: " ",
      dataIndex: "comment",
      key: "comment",
      render: (text: any, movie: any) => <Button type="primary" onClick={() => this.handleClickAddComment(movie.id)}>Add Comment</Button>
    },
    {
      title: "",
      dataIndex: "comments",
      key: "comments",
      render: (text: any, movie: any) => <Button type="primary" onClick={() => this.props.history.push(`${ReviewPage.url}/${movie.id}`)}>See Comments</Button>
    }
  ].filter(item => !item.hidden);

  state = {
    movies: [],
    isCommentModalVisible: false,
    selectedMovieId: 0
  }

  componentDidMount() {
    this.getMovies();
  }

  private getMovies = async () => {
    try {
      const movies = await this.movieService.getMovies();
      this.setState({
        movies
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Something went wrong.",
      });
    }
  }

  private handleClickLikeMovie = async (id: number, likeCount:number) => {

    this.setState({
      isCreateModalVisible: false
    });

    try {
      await this.movieService.likeMovie(id, likeCount);
      this.setState({
        isCreateModalVisible: false
      });
      this.getMovies();
    } catch (error) {

    }
  }

  private handleClickAddComment = (id: number) => {
    this.setState({
      isCommentModalVisible: true,
      selectedMovieId: id
    });

  }

  private handleSendComment = async (values: any) => {
    try {
      await this.reviewService.postComment(this.state.selectedMovieId, values.comment);
      this.setState({
        isCommentModalVisible: false
      });
    } catch (error) {

    }
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <div className="container">
          <Table rowKey="id" dataSource={this.state.movies} columns={this.columns} />
          <Modal
            visible={this.state.isCommentModalVisible}
            footer={false}
            onCancel={() => this.setState({ isCommentModalVisible: false })}>
            <Form
              layout="vertical"
              onFinish={this.handleSendComment}
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
