import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import store from 'redux/store'

import { Home, Login } from 'pages'

import 'antd/dist/antd.css';
import './styles/index.scss'

const root = document.getElementById('root')

render(
<Provider store={store}>
  <DndProvider backend={HTML5Backend}>
    <Router>
      <Route exact path='/' component={Home} />
    </Router>
  </DndProvider>
</Provider>
, 
root)

