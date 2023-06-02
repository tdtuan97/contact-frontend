import React, {Component} from "react"
import {Switch} from "react-router-dom"
import {PublicRoute} from './PublicRoute'
import {PrivateRoute} from './PrivateRoute'
import {ExceptionRoute} from './ExceptionRoute'
import * as Auth from '@features/Auth'
import * as Dashboard from '@features/Dashboard'
import {ErrorPage} from "@features/Exceptions";

class AllRoutes extends Component {
    render() {
        return (
            <Switch>
                <PublicRoute path="/login" layout='Auth'><Auth.Login/></PublicRoute>
                <PublicRoute path="/register" layout='Auth'>
                    <Auth.Register/>
                </PublicRoute>
                <PublicRoute path="/password-request" layout='Auth'>
                    <Auth.PasswordRequest/>
                </PublicRoute>
                <PublicRoute path="/password-reset" layout='Auth'>
                    <Auth.PasswordReset/>
                </PublicRoute>

                <PrivateRoute
                    path="/"
                    exact={true}
                    //redirectUrl={"/"}
                >
                    <Dashboard.Index/>
                </PrivateRoute>

                <ExceptionRoute path="*"><ErrorPage code={404}/></ExceptionRoute>
            </Switch>
        );
    }
}

export default AllRoutes
