const initialState = {
  //knightPosition: [0, 4],
  me: [],
  partner: [],
  inAir: null,
  next: 'W',
  isLoginIn: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GAME:SET': {
      console.log('GameSetUp')
      const etalon = [
        {id: 'Rook1', X: 0, Y: 0},
        {id: 'Knight1', X: 1, Y: 0},
        {id: 'Elephant1', X: 2, Y: 0},
        {id: 'Queen', X: 3, Y: 0},
        {id: 'King', X: 4, Y: 0},
        {id: 'Elephant2', X: 5, Y: 0},
        {id: 'Knight2', X: 6, Y: 0},
        {id: 'Rook2', X: 7, Y: 0},
        {id: 'Pawn1', X: 0, Y: 1},
        {id: 'Pawn2', X: 1, Y: 1},
        {id: 'Pawn3', X: 2, Y: 1},
        {id: 'Pawn4', X: 3, Y: 1},
        {id: 'Pawn5', X: 4, Y: 1},
        {id: 'Pawn6', X: 5, Y: 1},
        {id: 'Pawn7', X: 6, Y: 1},
        {id: 'Pawn8', X: 7, Y: 1},   
      ]
      let { me, address } = action.payload
      const pre = me === 'light'
      return {
        ...state,
        me: prepare({etalon, pre, down: true}),
        partner: prepare({etalon, pre: !pre}),
        address
      }
    }
    case 'MOVE:KNIGHT': {
      console.log(action.payload.id,'PASSS')
      const we = state.me[0].id[0]
      return action.payload.id[0] === we 
      ? {...state,
        me: getNewStaff(state.me, action.payload),
        partner: findAndKill(state.partner, action.payload),
        next: we === 'W' ? 'D' : 'W'
      }
      : {...state,
        partner: getNewStaff(state.partner, action.payload),
        me: findAndKill(state.me, action.payload),
        next: we
      }
    }
    case 'AIR:ADD': {
      return {
        ...state,
        inAir: action.payload
      }
    }
    case 'AIR:DELETE': {
      return {
        ...state, 
        inAir: null
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
} 

const getNewStaff = (staff, {id: checkId, x, y}) => {
  let a
  staff.forEach(({id}, i) => {
    if(id === checkId) {
      a = i
    }
  })
  staff[a] = {id: checkId, X:x, Y:y}
  return staff
}

const findAndKill = (enemyArr, {x, y}) => {
  console.log(enemyArr, x, y, 'DARK MOVE')
  let res = enemyArr.filter(({X, Y}) => !(X === x && Y === y));
  console.log(res, 'REEES')
  return res;
}

const prepare = ({etalon, pre, down}) => {
  return down
  ? etalon.map(el => ({id: pre ? 'W'+el.id : 'D'+el.id, X: el.X, Y: el.id.substr(0, 4) === 'Pawn' ? 6 : 7}))
  : etalon.map(el => ({id: pre ? 'W'+el.id : 'D'+el.id, X: el.X, Y: el.Y}))
}

// const down = [
//   {id: 'Rook1', X: 0, Y: 7},
//   {id: 'Knight1', X: 1, Y: 7},
//   {id: 'Elephant1', X: 2, Y: 7},
//   {id: 'Queen', X: 3, Y: 7},
//   {id: 'King', X: 4, Y: 7},
//   {id: 'Elephant2', X: 5, Y: 7},
//   {id: 'Knight2', X: 6, Y: 7},
//   {id: 'Rook2', X: 7, Y: 7},
//   {id: 'Pawn1', X: 0, Y: 6},
//   {id: 'Pawn2', X: 1, Y: 6},
//   {id: 'Pawn3', X: 2, Y: 6},
//   {id: 'Pawn4', X: 3, Y: 6},
//   {id: 'Pawn5', X: 4, Y: 6},
//   {id: 'Pawn6', X: 5, Y: 6},
//   {id: 'Pawn7', X: 6, Y: 6},
//   {id: 'Pawn8', X: 7, Y: 6},
// ]