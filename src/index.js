import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from "./reducer";
import { initialState } from './reducer';
import { StateProvider } from './StateProvider';


ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App/>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
