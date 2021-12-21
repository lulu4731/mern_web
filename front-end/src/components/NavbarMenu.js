import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import learnItLogo from '.././assets/logo.svg';
import LogoutIcon from '.././assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '.././actions/index'

class NavbarMenu extends React.Component {
    logoutUser = () => {
        this.props.logout();
    }
    render() {
        return (
            <>
                <Navbar expand='lg' bg='success' variant='dark' className='shadow'>
                    <Navbar.Brand className='font-weight-bolder text-dark'>
                        <img src={learnItLogo}
                            alt='learnItLogo'
                            width='32'
                            height='32'
                            className='shadow bg-warning'
                        />
                        LearnIt
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Nav.Link className='font-weight-bolder text-dark' to='/dashboard' as={Link}>
                                Dashboard
                            </Nav.Link>
                            <Nav.Link className='font-weight-bolder text-dark' to='/about' as={Link}>
                                About
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className='font-weight-bolder text-dark' disabled>
                                Welcome {this.props.userLogin.user.username}
                            </Nav.Link>
                        </Nav>
                        <Button variant='secondary' className='font-weight-bolder text-dark' onClick={this.logoutUser}>
                            <img src={LogoutIcon} alt='LogoutIcon' width='32' height='32' className='mr-2 shadow bg-danger' />
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        userLogin: state.checkLogin
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavbarMenu));
