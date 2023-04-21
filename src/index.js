import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fetchMissions } from './components/redux/missions/missionsSlice';
import { fetchRockets } from './components/redux/rockects/rocketsSlice';
import App from './App';
import store from './components/redux/store';

store.dispatch(fetchMissions());
store.dispatch(fetchRockets());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
