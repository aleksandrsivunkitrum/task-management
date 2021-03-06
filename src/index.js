import React from 'react';
import {HashRouter as Router} from "react-router-dom";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/theme/default';

import { store } from './store';
import App from './App';

const rootElement = document.getElementById("root");
render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>
    ,
    rootElement);

