import React from 'react';
import classNames from 'classnames'

const Overlay = ({color}) => (
  <div className={classNames('overlay', 
  color === 'red' && 'overlay--red', 
  color === 'yellow' && 'overlay--yellow',
  color === 'green' && 'overlay--green')} />
)

export default Overlay