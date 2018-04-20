import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import Idle from 'react-idle';

export class BootUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idle: false
        }
    }

    render() {
        return (
            <div>
                {this.state.idle === false && (
                    <div>
                        <Idle timeout={1 * 5 * 1000} onChange={({ idle }) => console.log({ idle })}
                            render={({ idle }) => {
                                console.log('logout!');

                                return (
                                    <h1>
                                        {idle ? <button onClick={() => this.state.idle === false}>"You will be logged out in 10 seconds" </button> : ""}
                                    </h1>
                                )
                            }
                            }
                        />
                        <Idle timeout={1 * 10 * 1000} onChange={({ idle }) => {
                            if (idle) {
                                console.log('boot');
                                this.props.dispatch(clearAuth());
                            }
                        }} />
                    </div>
                )}

            </div>
        )
    }
}




export default connect()(BootUser);