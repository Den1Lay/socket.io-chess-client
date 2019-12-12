import React from 'react';
import classNames from 'classnames'
import {Overlay} from 'components'

import './Square.scss'
const Square = ({black, children, overlay}) => {
  if(overlay && !children) {
    children = <div className={classNames('square__boll', `square__boll--${overlay}`)}></div>
  }
  return (
    <div>
      <div 
      className={classNames('square', black && 'square__black')}>
      {React.Children.map(children, () => React.cloneElement(children, {'deadColor': overlay}))}</div> 
    </div>
  )
}
export default Square