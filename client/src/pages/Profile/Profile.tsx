import { Button, Form, FormInstance, Input, Modal, Table } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import Header from "../../components/Header/Header";
import MovieService from "../../core/services/movie";
import PlayerService from "../../core/services/player";
import AppStore from "../../Store";
import ActorsPage from "../Actors/Actors";
import HomePage from "../Home/Home";
import "./Profile.scss";

@inject("appStore")
@observer
export default class ProfilePage extends React.Component<{
  appStore: AppStore;
  history: any
}> {

  public static url: string = "/profile";

  private movieService: MovieService = new MovieService();
  private playerService: PlayerService = new PlayerService();
  private editMovieFormRef = React.createRef<FormInstance>();
  private editPlayerFormRef = React.createRef<FormInstance>();


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
      title: "",
      dataIndex: "isShow",
      key: "isShow",
      render: (isShow: boolean, movie: any) => <Button type="primary" disabled={isShow} onClick={() => this.handleClickShareMovie(movie.id)}>Share</Button>
    },
    {
      title: "",
      dataIndex: "",
      key: "edit",
      render: (text: any, movie: any) => <Button type="primary" onClick={() => this.getMovie(movie.id)}>Edit</Button>
    },
    {
      title: "",
      dataIndex: "",
      key: "delete",
      render: (text: any, movie: any) => <Button type="primary" onClick={() => this.handleClickDeleteMovie(movie.id)}>Delete</Button>
    }
  ].filter(item => !item.hidden);

  private columnsForPlayers = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'playerId',
      hidden: true
    },
    {
      title: 'Actor Name',
      dataIndex: 'playerName',
      key: 'playerName',
    },
    {
      title: "",
      dataIndex: "isShow",
      key: "isShow",
      render: (isShow: boolean, player: any) => <Button type="primary" disabled={isShow} onClick={() => this.handleClickSharePlayer(player.id)}>Share</Button>
    },
    {
      title: "",
      dataIndex: "",
      key: "editPlayer",
      render: (text: any, player: any) => <Button type="primary" onClick={() => this.getPlayer(player.id)}>Edit</Button>
    },
    {
      title: "",
      dataIndex: "",
      key: "deletePlayer",
      render: (text: any, player: any) => <Button type="primary" onClick={() => this.handleClickDeletePlayer(player.id)}>Delete</Button>
    }
  ].filter(item => !item.hidden);

  state = {
    // for movie list
    movie: undefined,
    movies: [],
    isCreateModalVisible: false,
    isEditModalVisible: false,
    selectedMovieId: 0,

    // for players list
    player: undefined,
    players: [],
    isPlayerCreateModalVisible: false,
    isPlayerEditModalVisible: false,
    selectedPlayerId: 0,
  }

  componentDidMount() {
    this.getMovies();
    this.getPlayers();
  }

  /// Movie operations

  private getMovies = async () => {
    try {
      const movies = await this.movieService.getUserMovies();
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

  private handleClickCreateMovie = () => {
    this.setState({
      isCreateModalVisible: true,
    });
  }

  private handleClickShareMovie = async (id: number) => {

    try {
      await this.movieService.shareMovie(id);
      Modal.success({
        title:"Success",
        content:"Movie successfully shared",
        onOk:()=>{
          this.props.history.push(HomePage.url);
        }
      });
    } catch (error) {

    }
  }

  private handleClickDeleteMovie = async (id: number) => {

    try {
      await this.movieService.deleteMovie(id);
      this.setState({
        isCreateModalVisible: false
      });
      this.getMovies();
    } catch (error) {

    }
  }

  private handleSaveMovie = async (values: any) => {
    console.log(values);

    try {
      await this.movieService.createMovie(values.movieName, values.category);
      this.setState({
        isCreateModalVisible: false
      });
      this.getMovies();
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Something went wrong.",
      });
    }
  }

  private getMovie = async (id: number) => {
    try {
      const movie = await this.movieService.getMovieById(id);
      this.setState({
        movie,
        selectedMovieId: id,
        isEditModalVisible: true
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Something went wrong.",
      });
    }
  }

  private onFinishMovieForm = async (values: any) => {
    console.log(values);

    try {
      await this.movieService.editMovie(this.state.selectedMovieId, values.movieName, values.category);
      this.setState({
        isEditModalVisible: false
      });
      this.getMovies();
    } catch (error) {

    }
  }

  private handleClickCancelForm = () => {
    this.setState({
      isEditModalVisible: false,
      isPlayerEditModalVisible: false,
      movie: undefined,
      player: undefined
    });
    this.editMovieFormRef.current?.resetFields();
    this.editPlayerFormRef.current?.resetFields();
  }

  /// Player operations

  private getPlayers = async () => {
    try {
      const players = await this.playerService.getUserPlayers();
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


  private handleClickCreatePlayer = () => {
    this.setState({
      isPlayerCreateModalVisible: true,
    });
  }

  private handleClickSharePlayer = async (id: number) => {

    try {
      await this.playerService.sharePlayer(id);
      Modal.success({
        title:"Success",
        content:"Actor successfully shared",
        onOk:()=>{
          this.props.history.push(ActorsPage.url);
        }
      });
    } catch (error) {

    }
  }

  private handleClickDeletePlayer = async (id: number) => {

    try {
      await this.playerService.deletePlayer(id);
      this.setState({
        isCreateModalVisible: false
      });
      this.getPlayers();
    } catch (error) {

    }
  }

  private getPlayer = async (id: number) => {
    try {
      const player = await this.playerService.getPlayerById(id);
      this.setState({
        player,
        selectedPlayerId: id,
        isPlayerEditModalVisible: true
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Something went wrong.",
      });
    }
  }

  private handleSavePlayer = async (values: any) => {

    try {
      await this.playerService.createPlayer(values.playerName);
      this.setState({
        isPlayerCreateModalVisible: false
      });
      this.getPlayers();
    } catch (error) {

    }
  }

  private onFinishPlayerForm = async (values: any) => {
    console.log(values);

    try {
      await this.playerService.editPlayer(this.state.selectedPlayerId, values.playerName);
      this.setState({
        isEditModalVisible: false,
        isPlayerEditModalVisible: false

      });
      this.getPlayers();
    } catch (error) {

    }
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <div className="container mt-4">
          <div className="d-flex justify-content-end">
            <Button type="link" onClick={() => this.handleClickCreateMovie()}>Create New Movie</Button>
          </div>
          <Table rowKey="id" dataSource={this.state.movies} columns={this.columns} />

          <div className="d-flex justify-content-end">
            <Button type="link" onClick={() => this.handleClickCreatePlayer()}>Create New Actor</Button>
          </div>
          <Table rowKey="id" dataSource={this.state.players} columns={this.columnsForPlayers} />
          <Modal
            visible={this.state.isCreateModalVisible}
            footer={false}
            onCancel={() => this.setState({ isCreateModalVisible: false })}>
            <Form
              layout="vertical"
              onFinish={this.handleSaveMovie}
            >
              <Form.Item
                label="Movie Name"
                name="movieName"
                rules={[{ required: true, message: 'Movie name is require!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[{
                  required: true, message: 'Category is require!'
                }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            destroyOnClose={true}
            visible={this.state.isEditModalVisible}
            footer={false}
            onCancel={this.handleClickCancelForm}>
            {
              this.state.movie && (
                <Form
                  ref={this.editMovieFormRef}
                  name="movie-form"
                  initialValues={this.state.movie}
                  onFinish={this.onFinishMovieForm}
                  wrapperCol={{ span: 16 }}
                  labelCol={{ span: 8 }}
                  requiredMark={false}
                  labelAlign="left"
                >
                  <Form.Item
                    label="Movie Name"
                    name="movieName"
                    rules={[{
                      required: true, message: 'Please input movieName!'
                    }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{
                      required: true, message: 'Category is require!'
                    }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                    <Button htmlType="submit" type="primary"> Save </Button>
                  </Form.Item>
                </Form>
              )
            }
          </Modal>
          <Modal
            visible={this.state.isPlayerCreateModalVisible}
            footer={false}
            onCancel={() => this.setState({ isPlayerCreateModalVisible: false })}>
            <Form
              layout="vertical"
              onFinish={this.handleSavePlayer}
            >
              <Form.Item
                label="Actor Name"
                name="playerName"
                rules={[{ required: true, message: 'Please add new player name.' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            destroyOnClose={true}
            visible={this.state.isPlayerEditModalVisible}
            footer={false}
            onCancel={this.handleClickCancelForm}>
            {
              this.state.player && (
                <Form
                  ref={this.editPlayerFormRef}
                  name="player-form"
                  initialValues={this.state.player}
                  onFinish={this.onFinishPlayerForm}
                  wrapperCol={{ span: 16 }}
                  labelCol={{ span: 8 }}
                  requiredMark={false}
                  labelAlign="left"
                >
                  <Form.Item
                    label="Actor Name"
                    name="playerName"
                    rules={[{
                      required: true, message: 'Player name is require!'
                    }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                    <Button htmlType="submit" type="primary"> Save </Button>
                  </Form.Item>
                </Form>
              )
            }
          </Modal>
        </div>
      </div>
    )
  }
}
