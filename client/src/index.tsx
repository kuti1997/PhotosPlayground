import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'react-redux'
import { store } from './Store/store';
//import { TitleBar } from 'electron-react-titlebar/renderer';
import { TitleBar } from './Components/TitleBar/TitleBar';

ReactDOM.render(
  <Provider store={store}>
      <TitleBar />
      <App />
  </Provider>
  ,
  document.getElementById('root')
);
