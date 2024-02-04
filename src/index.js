import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import productsReducer from './myStore/productsReducer';
import { PersistGate } from 'redux-persist/integration/react';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, productsReducer)
const myStore = createStore(persistedReducer);
const persistor = persistStore(myStore)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <PersistGate loading={'Loading.............'} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/products" />} />
            {/* <Route exact path="/" element={<App />} /> */}
            <Route exact path="/products" element={<App />} />
            <Route exact path="/products/:id" element={<App />} />

          </Routes>
        </BrowserRouter>
      </PersistGate>

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
