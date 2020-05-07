import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'

import configureStore from './store/configureStore';
const store = configureStore();

const rootElement = document.getElementById('root')
rootElement.style.height = '100%'
rootElement.style.backgroundColor = 'black' 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
)