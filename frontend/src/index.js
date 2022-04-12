import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import AppRoute from './routes'
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'))
const store = createStore(rootReducer)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </Provider>
)
