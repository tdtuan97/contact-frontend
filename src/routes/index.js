import React, {Component} from "react"
import {Switch} from "react-router-dom"
import {PublicRoute} from './PublicRoute'
import {PrivateRoute} from './PrivateRoute'
import {ExceptionRoute} from './ExceptionRoute'
import * as Auth from '@features/Auth'
import * as Dashboard from '@features/Dashboard'
import * as ContactGroup from '@features/ContactGroup'
import * as Contact from '@features/Contact'
import {ErrorPage} from "@features/Exceptions";

class AllRoutes extends Component {
    render() {
        return (
            <Switch>
                <PublicRoute path="/login" layout='Auth'><Auth.Login/></PublicRoute>
                <PublicRoute path="/register" layout='Auth'>
                    <Auth.Register/>
                </PublicRoute>
                <PublicRoute path="/register-success" layout='Auth'>
                    <Auth.RegisterSuccess/>
                </PublicRoute>

                <PrivateRoute
                    path="/"
                    exact={true}
                >
                    <Dashboard.Index/>
                </PrivateRoute>
                <PrivateRoute
                    path="/contact"
                    exact={true}
                >
                    <Contact.Index/>
                </PrivateRoute>

                <PrivateRoute
                    path="/contact-group"
                    exact={true}
                >
                    <ContactGroup.Index/>
                </PrivateRoute>

                <ExceptionRoute path="*"><ErrorPage code={404}/></ExceptionRoute>
            </Switch>
        );
    }
}

export default AllRoutes
