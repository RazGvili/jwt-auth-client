import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './Routes';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { initApolloClient } from './utils/apollo';

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={initApolloClient()}>
            <Routes />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
