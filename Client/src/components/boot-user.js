import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import Idle from 'react-idle';

export class BootUser extends React.Component {
    state = {
        idle: false
    }

    render() {
        return (
            <div>
                {this.state.idle === false && (
                    <Idle timeout={1 * 10 * 1000} onChange={({ idle }) => console.log({ idle })}
                        render={({ idle }) =>
                            <h1>
                                {idle ? "You will be logged out"  : ""}
                            </h1>
                        }
                    />
                )}

            </div>
        )
    }
}




