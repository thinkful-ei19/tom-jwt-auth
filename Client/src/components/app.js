import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import { refreshAuthToken } from '../actions/auth';
import Idle from 'react-idle';
import {BootUser} from './boot-user';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            5 * 60 * 1000 // 5 min
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }



    // onUserNavigate() {
    //     document.onclick = function () {
    //         _idleSecondsCounter = 0;
    //     };

    //     document.onmousemove = function () {
    //         _idleSecondsCounter = 0;
    //     };

    //     document.onkeypress = function () {
    //         _idleSecondsCounter = 0;
    //     };
    // }
    // CheckIdleTime() {
    //     var IDLE_TIMEOUT = 60; //seconds
    //     var _idleSecondsTimer = null;
    //     var _idleSecondsCounter = 0;
    //     _idleSecondsCounter++;
    //     var oPanel = document.getElementById("SecondsUntilExpire");
    //     if (oPanel)
    //         oPanel.innerHTML = (IDLE_TIMEOUT - _idleSecondsCounter) + "";
    //     if (_idleSecondsCounter >= IDLE_TIMEOUT) {
    //         window.clearInterval(_idleSecondsTimer);
    //         alert("Time expired!");
    //         document.location.href = "logout.html";
    //     }
    // }



    render() {
        return (
            <div className="app">
            <BootUser />    

                <HeaderBar />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
