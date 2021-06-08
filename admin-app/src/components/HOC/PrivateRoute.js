import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute(props) {
    const token = localStorage.getItem('token');
    return token ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/signin" />
    )
}
