import io from 'socket.io-client';
import actions from 'redux/actions'
import store from 'redux/store'

const { gameSet, moveTo } = actions

const socket = io('http://localhost:4000')

socket.on('GAME:START_FINDING', () => {
    console.log('CONFIRM')
  })
socket.on('HANDSHAKE', ({socket}) => console.log(`Handshake: ${socket}`))
socket.on('GAME:FIND', ({partner, position}) => {
  store.dispatch(gameSet({address: partner, me: position}))
  console.log(`FIND Game with ${partner} and ${position} position`)
})
socket.on('GAME:MOVE', ({payload: {id, x, y}}) => {
  console.log('GetPayload')
  store.dispatch(moveTo(id, x, y))
})

export default socket