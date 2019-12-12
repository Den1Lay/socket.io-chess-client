const actions = {
  moveTo: (id, x, y) => ({
    type: 'MOVE:KNIGHT',
    payload: {id, x, y}
  }),
  addToAir: id => ({
    type: 'AIR:ADD',
    payload: id
  }),
  deleteFromAir: () => ({
    type: 'AIR:DELETE'
  }),
  gameSet: ({address, me}) => ({
    type: 'GAME:SET',
    payload: {
      address,
      me
    }
  })
}
  

export default actions
