import io from 'socket.io-client';
import actions from 'redux/actions'
import store from 'redux/store'

const { gameSet, moveTo } = actions

const socket = io(window.location.origin)

socket.on('GAME:START_FINDING', () => {
    console.log(window.location)
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
socket.on('TEST:RES', ({payload}) => {
  console.log(`TEST: ${payload}`)
})

export default socket