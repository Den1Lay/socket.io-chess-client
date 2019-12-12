import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import classNames from 'classnames';


import './Login.scss'

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <section className={classNames('login')}>
      
      <Form onSubmit={() => handleSubmit} className="login-form">
        <Form.Item>
          <span>ВХОД / РЕГИСТРАЦИЯ</span>
        </Form.Item>
        <Form.Item>
         <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
        </Form.Item>
        <Form.Item>
          <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form> 
    </section>
  )
}

export default Login