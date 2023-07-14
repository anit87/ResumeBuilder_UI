import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import { ThemeProvider } from '@mui/styles';
import theme from './Theme/Theme';
import { BrowserRouter as Router } from 'react-router-dom';
// import "swiper/css/bundle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from './redux/Store';
import { Provider } from 'react-redux';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router >
      <Provider store={store} >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Router>

  </React.StrictMode>
);

