import React from 'react';
import { connect } from 'react-redux'
import { DragPreviewImage, useDrag } from 'react-dnd'
import classNames from 'classnames'
import actions from 'redux/actions'

import { socket } from 'cors'

import picture from 'img/picture.png'
import './Knight.scss'


const Knight = ({addToAir, deleteFromAir, moveTo, state, id, simbol, next, deadColor, me, address}) => {
  console.log(deadColor, 'DEADCOLOR')
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: 'knight', id},
    begin: (monitor) => {
      addToAir(id)
      console.log(`DEBAG STATE: ${state}`)
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if(item && dropResult) {
        //console.log(item.id,' and ',dropResult.name)
        const {x, y} = dropResult
        console.log(`DEBAG STATE: ${state}`)
        console.log(`MoveTo id: ${id}, X:${x}, y: ${y}`)
        moveTo(id, x, y)
        socket.emit('GAME:MOVE', {address, payload: {id, x, y: Math.abs(y-7)}})
        deleteFromAir()
      }
    },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
    }),
    
  })  
  return (
    <>
      {/* <DragPreviewImage connect={preview} src={picture}/> */}
      <span 
      ref={id[0] === next && id[0] === me[0].id[0] ? drag : null}
      className={
          classNames('knight', 
          isDragging && 'knight__isDraging', 
          !deadColor && (id[0] === 'D'
          ? 'knight__darkSide'
          : 'knight__lightSide'),
          deadColor && 'knight__deadColor')}>{simbol}</span>
    </>
  )
}

export default connect(({inAir, next, me, address})=>({inAir, next, me, address}), actions)(Knight)