import React, {useState} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames'
import { socket } from 'cors'

import { Board } from 'containers'
import { Button, Checkbox, Alert } from 'antd'
import { Login } from 'moduls'

import './Home.scss'

const Home = ({ next, me, address }) => {
  let [findStatus, setFindStatus] = useState(false)

  const findHandler = () => {
    if(!findStatus) {
      console.log('Начало поиска')
      socket.emit('GAME:FINDING')
    } else {
      socket.emit('GAME:STOP_FINDING')
      console.log('Прекращение поиска')
    }
    setFindStatus(!findStatus)
  }
  const gnevHandler = () => {
    socket.emit('GAME:ISTIME', {address})
  }

  return (
    <section className={classNames('home')}>
      <div className='home__mainLine'>
        <div className='home__leftTab'>
          <div className='home__leftTab__login'>
            <Login />
          </div>
        </div>
        <div className='home__gameBoard'>
          <div className='home__gameBoard__alertZone'>
            {
              me.length > 0
              ? next === me[0].id[0]
                  ? <Alert message="Ваш ход" type="success" showIcon/>
                  : <Alert message="Ход противника" type="warning" showIcon/>
              : <Alert message="Пора затестить этот shit)" type="success" showIcon/>
            }
          </div>
          <Board />
          <div className='home__gameBoard__controlers'>
            <Checkbox onChange={(e) => console.log(e)}>Использовать подсказки</Checkbox>
            {
              me.length > 0 
              ? <Button
              onClick={gnevHandler}
              type='danger'>
              ПОРА УЖЕ ХОДИТЬ!</Button>
              : <Button 
              onClick={findHandler} 
              type={findStatus ? 'dashed' : 'danger'}>
              {findStatus ? 'Остановить поиск' : 'Найти противника!'}</Button>
            }
          </div>
        </div>
        <div className='home__rightTab'>
          
        </div>
      </div>
    </section>
  )
}

export default connect(({next, me, address}) => ({next, me, address}))(Home)