import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {legacy_createStore as createStore} from 'redux'
import {Provider} from "react-redux"
import {composeWithDevTools} from "@redux-devtools/extension"
import rootReducer from './reducers';



const store = createStore(rootReducer, composeWithDevTools());



ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)
