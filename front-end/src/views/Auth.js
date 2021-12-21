import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router';
import { loadUser } from '.././actions/index';
class Auth extends React.Component {
    componentDidMount() {
        this.props.setLogin();
    }
    render() {
        let body;
        if (this.props.checkLogin.authLoading) {
            body = (
                <div className="d-flex justify-content mt-2">
                    <Spinner animation='border' variant='info' />
                </div>
            )
        } else if (this.props.checkLogin.isAuthenticated) return <Redirect to='/dashboard' />
        else {
            body = (
                <>
                    {this.props.authRoute === 'login' && <LoginForm />}
                    {this.props.authRoute === 'register' && <RegisterForm />}
                </>
            )
        }
        return (
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1>LearnIt</h1>
                        <h4>Keep track of what you are learning</h4>
                        {body}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        checkLogin: state.checkLogin
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        setLogin: () => {
            dispatch(loadUser());
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
