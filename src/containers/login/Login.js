import React, { Component } from 'react';
import { Form, Button, Input, message } from 'antd';
import { API_URL } from '../../config';

import './login.scss';
const FormItem = Form.Item;

class Login extends Component {
  onLoginSubmit = () => {
    this.props.form.validateFields((err, formValues) => {
      if (!err) {
        fetch(`${API_URL}/api-auth/login/`, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues)
        })
          .then(results => results.json())
          .then(data => {
            console.log('data is ', data);
          })
          .catch(() => message.error('Please check the credentials'));
      } else {
        message.error('Please check the credentials');
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      form
    } = this.props;
    return (
      <div className="loginContainer">
        <h2>Login</h2>
        <Form>
          <FormItem label="User Name">
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(<Input type="text" className="inputField" />)}
          </FormItem>
          <FormItem label="Password">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(<Input type="password" className="inputField" />)}
          </FormItem>
          <div>
            <Button type="primary" className="cta" onClick={this.onLoginSubmit}>
              Log in
            </Button>
            <Button className="cta cancel" onClick={() => form.resetFields()}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: 'Login' })(Login);

export default LoginForm;
