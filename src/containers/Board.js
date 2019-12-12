import React from 'react';
import { connect } from 'react-redux'
import actions from 'redux/actions'

import {BoardSquare} from 'containers' 

import 'styles/Board.scss'

const Board = ({me, partner, moveTo, inAir}) => {
  //console.log(white)
  let squares = []
  for (let x = 0; x < 64; x++) {
    squares.push(<BoardSquare 
        x={x} 
        key={x}
        //knightPosition={knightPosition}
        me={me}
        partner={partner}
        inAir={inAir}
        moveTo={moveTo} />)
  }

  return (
    <div className='board'>
      {squares}
    </div>
  )
}

export default connect(state => ({me: state.me, partner: state.partner, inAir: state.inAir}), actions)(Board)