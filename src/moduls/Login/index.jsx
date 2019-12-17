import React, {useState} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import classNames from 'classnames';

import { socket } from 'core'

import './Login.scss'

const Login = function() {
  const [user, setUser] = useState('')
  //const [counter, setCounter] = useState(0)

  const handleSubmit = (e) =>  {
    e.preventDefault()
    setInterval(() => {
      socket.emit('TEST:USER', {user, payload: new Date})
    }, 500)
  }
  const pushHandler = () => {
    socket.emit('TEST:USER', {user, payload: new Date})
  }


  const changeHandler = (e) => {
    setUser(e.target.value)
  }

  return (
    <section className={classNames('login')}>
      
      <Form className="login-form">
        <Form.Item>
          <span>ВХОД / РЕГИСТРАЦИЯ</span>
        </Form.Item>
        <Form.Item>
         <Input
              onChange={changeHandler}
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
          <Button 
            onClick={pushHandler}
            type="primary" 
            htmlType="submit" 
            className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form> 
    </section>
  )
}

export default Login