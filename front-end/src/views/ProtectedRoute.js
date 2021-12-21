import React from 'react'
import { connect } from 'react-redux';
import { loadUser } from '.././actions/index'
import Spinner from 'react-bootstrap/Spinner';
import { Redirect, Route } from 'react-router';
import NavbarMenu from '../components/NavbarMenu';
class ProtectedRoute extends React.Component {
    componentDidMount() {
        this.props.setLogin();
    }
    render() {
        if (this.props.checkLogin.authLoading) {
            return (
                <div className="spinner-container">
                    <Spinner animation="border" variant='info' />
                </div>
            )
        }
        return (
            <>
                <NavbarMenu />
                <Route {...this.rest} render={props => this.props.checkLogin.isAuthenticated ? (<>
                    <this.props.component {...rest}  {...props} />
                </>) : (<Redirect to='/login' />)} />
            </>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
