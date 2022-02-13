import { Button, Form, Input, Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import FacebookLogin from 'react-facebook-login';
import AuthService from "../../core/services/auth";
import AppStore from "../../Store";
import HomePage from "../Home/Home";
import SignupPage from "../Signup/Signup";
import "./Login.scss";

@inject("appStore")
@observer
export default class LoginPage extends React.Component<{ appStore: AppStore, history: any }> {

  public static url: string = "/login";

  private authService: AuthService = new AuthService();

  private onFinishLoginForm = async (values: any) => {
    try {
      const { username, password } = values;
      await this.authService.login(username, password);
      this.props.history.push(HomePage.url);
    } catch (error) {
      Modal.error({
        centered: true,
        title: 'Error',
        content: 'Username or password not correct.'
      });
    }
  }

  private handleFacebookSignUp = async (response: any) => {
    console.log(response)
    try {
      await this.authService.signup(response.name, '', response.email, response.email);
      this.props.history.push(HomePage.url)
    } catch (error) {
      if (error.response && error.response.status === 409) {
        this.handleFacebookLogin(response)
      }
    }
  }

  private handleFacebookLogin = async (response: any) => {
    try {
      await this.authService.login(response.email, response.email);
      this.props.history.push(HomePage.url)
    } catch (error) {
      Modal.error({
        centered: true,
        title: 'Error',
        content: 'Sorry, somenthing went wrong..'
      });
    }
  }

  render() {
    return (
      <div id="login">
        <div className="container">
          <h1 className="d-flex justify-content-center">Login</h1>
          <div className="form-wrapper">
            <Form
              name="login-form"
              onFinish={this.onFinishLoginForm}
              wrapperCol={{ span: 16 }}
              labelCol={{ span: 8 }}
              requiredMark={false}
              labelAlign="left"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{
                  required: true, message: 'Please input your username!'
                }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{
                  required: true, message: 'Please input your password!'
                }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <div className="d-flex justify-content-end">
                  <Button block className="login-button" htmlType="submit" type="primary">Login</Button>
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                  <a className="btn btn-outline-dark w-100 mb-3" href={`${process.env.REACT_APP_BASE_URL}/auth/google`} role="button" style={{ textTransform: "none" }}>
                    <img width="20px" className="mr-2" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    Login with Google
                  </a>
                  <FacebookLogin
                    appId="2042370112607595"
                    fields="id,name,email"
                    callback={this.handleFacebookSignUp}
                    icon="fa-facebook" />

                <div className="d-flex justify-content-center align-items-center mt-3">
                  <p className="m-0"> Don't have an account? </p>
                  <Button type="link" onClick={() => this.props.history.push(SignupPage.url)}>Sign Up</Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}