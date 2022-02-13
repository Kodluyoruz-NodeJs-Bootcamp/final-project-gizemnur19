import { Button, Form, Input, Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AuthService from "../../core/services/auth";
import AppStore from "../../Store";
import LoginPage from "../Login/Login";
import "./Signup.scss";

@inject("appStore")
@observer
export default class SignupPage extends React.Component<{ appStore: AppStore, history: any }> {

  public static url: string = "/signup";

  private authService: AuthService = new AuthService();

  private onFinishSignupForm = async (values: any) => {
    try {
      const { firstName, lastName, username, password } = values;
      const response = await this.authService.signup(firstName, lastName, username, password);
      console.log(response);
      if (response) {
        Modal.success({
          title: "Success",
          content: response.msg,
          onOk: () => {
            this.props.history.push(LoginPage.url);
          }
        });
      }
    } catch (error) {
      console.log("error", error.response);
      Modal.error({
        centered: true,
        title: 'Error',
        content: error.response.data.msg
      });
    }
  }

  render() {
    return (
      <div id="signup">
        <div className="container">
          <h1 className="d-flex justify-content-center">Sign Up</h1>
          <div className="form-wrapper">
            <Form
              name="signup-form"
              onFinish={this.onFinishSignupForm}
              wrapperCol={{ span: 16 }}
              labelCol={{ span: 8 }}
              requiredMark={false}
              labelAlign="left"
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{
                  required: true, message: 'First Name is require!'
                }, {
                  min: 4,
                  message: "Please enter min 4 character!"
                }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{
                  required: true, message: 'Last Name is require!'
                }, {
                  min: 4,
                  message: "Please enter min 4 character!"
                }]}>
                <Input />
              </Form.Item>
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
                hasFeedback
                rules={[{
                  required: true, message: 'Please input your password!'
                },
                {
                  min: 4,
                  message: "Please enter min 4 character!"
                }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[{
                  required: true, message: 'Please input your password!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                })]}>
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <div className="d-flex justify-content-end">
                  <Button block className="signup-button" htmlType="submit" type="primary">Sign Up</Button>
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="m-0">Already have an account? </p>
                  <Button type="link" onClick={() => this.props.history.push(LoginPage.url)}>Login</Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}