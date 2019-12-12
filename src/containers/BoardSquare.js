import React from 'react';
import { useDrop } from 'react-dnd'

import {Square, Knight} from 'components'

const checkMove = (me, partner, inAir, x, y) => {
  let res = me.filter(({id}) => id === inAir);
  let {X, Y, id} = res[0];
  console.log(`X: ${X}, Y: ${Y}, AIR: ${inAir}`)
  const dx = X - x;
  const dy = Y - y;
  if(me.some(({X, Y}) => X === x && Y === y)) {
    return false
  }
  
  if(id.slice(0, 5) === 'WPawn' || id.slice(0, 5) === 'DPawn' || id === 'WKing' || id === 'DKing') {
    return (
      (Math.abs(dx) === 1 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 0) ||
      (Math.abs(dx) === 0 && Math.abs(dy) === 1)
    )
  } else if(id.slice(0, 7) === 'WKnight' || id.slice(0, 7) === 'DKnight') {
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
      )
  } else if(id === 'WQueen' || id === 'DQueen') {
    return checkPath(
        {
        white: me, // Белые это мы 
        dark: partner, // Тьма противник 
        X, Y, x, y, directions: [
        {xDir:1, yDir:1},
        {xDir:-1, yDir:-1},
        {xDir:-1, yDir:1},
        {xDir:1, yDir:-1},
        {xDir:1, yDir: 0},
        {xDir:-1, yDir: 0},
        {xDir:0, yDir: 1},
        {xDir:0, yDir: -1}
      ]
    })
  } else if ( id.slice(0, 9) === 'WElephant' || id.slice(0, 9) === 'DElephant') {
    return checkPath(
      {
      white: me, 
      dark: partner, 
      X, Y, x, y, directions: [
      {xDir:1, yDir:1},
      {xDir:-1, yDir:-1},
      {xDir:-1, yDir:1},
      {xDir:1, yDir:-1},
    ]
  })
  } else if ( id.slice(0, 5) === 'WRook' || id.slice(0, 5) === 'DRook') {
    return checkPath(
      {
      white: me, 
      dark: partner, 
      X, Y, x, y, directions: [
      {xDir:1, yDir: 0},
      {xDir:-1, yDir: 0},
      {xDir:0, yDir: 1},
      {xDir:0, yDir: -1}
    ]
  }) 
  }
}

const checkPath = ({white, dark, X, Y, x, y, directions}) => {
  let checkArr = [];
  const pathBuilder = (xDir, yDir) => {
    let ripFlag = true
    let newPlace = {newX: X, newY: Y}
    while(ripFlag) {
      newPlace = {newX: newPlace.newX + xDir, newY: newPlace.newY + yDir}
      if (newPlace.newX <= 7 && newPlace.newX > -1 && newPlace.newY <= 7 && newPlace.newY > -1) {

        if(dark.some(({X, Y}) => X === newPlace.newX && Y === newPlace.newY)) {
          checkArr.push(newPlace)
          ripFlag = false
        }

        if(white.some(({X, Y}) => X === newPlace.newX && Y === newPlace.newY)) {
          ripFlag = false
        } else {
          checkArr.push(newPlace)
        }

      } else {
        ripFlag = false
      }

    }
  };
  directions.forEach(({xDir, yDir}) => pathBuilder(xDir, yDir))
  return checkArr.some(({newX, newY}) => newX === x && newY === y)
}

const BoardSquares = ({x:i, me, partner, inAir}) => {
  console.log(me, partner)
  const x = i % 8;
  const y = ~~(i / 8);
  const black = (x + y) % 2 === 1;
  let place = null; 

  const preparePlace = ({array}) => {
    array.forEach(({X, Y, id}) => {
      if(x === X && y === Y) {
        switch (id.substr(1, 4)) {
          case 'Rook': 
            place = <Knight id={id} simbol={'♜'} />
            break;
          case 'Elep': 
            place = <Knight id={id} simbol={'♝'} />
            break;
          case 'Knig': 
            place = <Knight id={id} simbol={'♞'} />
            break;
          case 'Pawn': 
            place = <Knight id={id} simbol={'♟'} />
            break;
          case 'Quee':
            place = <Knight id={id} simbol={'♛'} />
            break;
          case 'King':
            place = <Knight id={id} simbol={'♚'} />
            break;
        }
      }
    })
  }
  preparePlace({array: me})
  preparePlace({array: partner})
  // me.forEach(({X, Y, id}, i) => {
  //   if(x === X && y === Y) {
  //     if(id.slice(0, 5) === 'WPawn') {
  //       place = <Knight id={id} simbol={'♟'} />
  //     } else if (id.slice(0, 7) === 'WKnight') {
  //       place = <Knight id={id} simbol={'♞'}/>
  //     } else if (id.slice(0, 9) === 'WElephant') {
  //       place = <Knight id={id} simbol={'♝'}/>
  //     } else if (id.slice(0, 5) === 'WRook') {
  //       place = <Knight id={id} simbol={'♜'}/>
  //     }
  //     switch (id) {
  //       case 'WQueen':
  //         place = <Knight id={id} simbol={'♛'} />
  //         break;
  //       case 'WKing':
  //         place = <Knight id={id} simbol={'♚'} />
  //         break;
  //     }
  //   }
  // })
  // //console.log('ЕГОР ЭТО ДЛЯ ТЕБЯ))))')
  // partner.forEach(({X, Y, id}, i) => {
  //   if(x === X && y === Y) {
  //     if(id.slice(0, 5) === 'DPawn') {
  //       place = <Knight id={id} simbol={'♟'} />
  //     } else if (id.slice(0, 7) === 'DKnight') {
  //       place = <Knight id={id} simbol={'♞'}/>
  //     } else if (id.slice(0, 9) === 'DElephant') {
  //       place = <Knight id={id} simbol={'♝'}/>
  //     } else if (id.slice(0, 5) === 'DRook') {
  //       place = <Knight id={id} simbol={'♜'}/>
  //     }
  //     switch(id) {
  //       case'DQueen':
  //         place = <Knight id={id} simbol={'♛'} />
  //         break;
  //       case 'DKing':
  //         place = <Knight id={id} simbol={'♚'} />
  //         break;
        
  //     }
  //   }
  // })

  const [{ isOver, canDrop }, drop] = useDrop({
		accept: 'knight',
    drop: () => ({x, y}),
    canDrop: () => checkMove(me, partner, inAir, x, y),
		collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
		}),
  })
  //console.log(place, 'PLACE')
  //console.log(`SQUARE: X:${x}, Y:${y}, isOver: ${isOver}, canDrop: ${canDrop}`)
  let backColor = isOver && !canDrop
  ? "red" : !isOver && canDrop
  ? "yellow" : isOver && canDrop
  ? "green" : null
  return (
    <div ref={drop} style={{width: '12.5%', height: '12.5%'}}>
      <Square 
        key={i} 
        black={black}
        overlay={backColor}>
        {place}
      </Square>
    </div>
  )
}

export default BoardSquares