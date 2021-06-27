import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './pages/Header';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Register" component={Register} />
                <Route exact path="/Login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
};
