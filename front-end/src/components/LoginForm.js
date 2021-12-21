/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
// import callerAPI from '.././utils/callerAPI';
import *as actions from '.././actions/index';
import { connect } from 'react-redux';
import { loginUser } from '.././utils/callerAPI';
import AlertMessage from './AlertMessage';

class LoginForm extends React.Component {
    // const [loginForm, setLoginForm] = useState({
    //     username: '',
    //     password: ''
    // });
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            alert: ''
        };
        // this.state = {

        // }
    }
    onChangeLogin = (event) => {
        // setLoginForm({
        //     ...loginForm,
        //     [event.target.name]: event.target.value
        // })
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmitLogin = async (event) => {
        event.preventDefault();
        const loginForm = {
            username: this.state.username,
            password: this.state.password
        }
        // this.props.login(loginForm);
        // callerAPI('auth/login', 'POST', loginForm).then(res => {
        //     this.handleClick();
        // }).catch(error => {
        //     if (error.data) return error.data;
        //     else return { success: false, message: error.message }
        // });
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success === true) {
                this.props.setLogin();
            } else {
                this.setState({
                    ...this.state.alert,
                    alert: loginData.message

                })
                setTimeout(() => this.setState({
                    ...this.state.alert,
                    alert: ''

                }), 2000)
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleClick = () => {
        this.props.history.push("/dashboard");
    };
    render() {
        const { username, password, alert } = this.state;
        return (
            <>
                <Form className='my-4' onSubmit={this.onSubmitLogin}>
                    <AlertMessage message={alert} />
                    <Form.Group >
                        <Form.Control type='text'
                            placeholder='Username'
                            name='username'
                            require="true"
                            value={username}
                            onChange={this.onChangeLogin}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control type='password'
                            placeholder='Password'
                            name='password'
                            require='true'
                            value={password}
                            onChange={this.onChangeLogin}
                        />
                    </Form.Group>
                    <Button variant='success' type='submit'>Login</Button>
                </Form>
                <p>Don't have account?
                &nbsp;
                <Link to='/register'>
                        <Button variant='info' size='sm' className='ml-2'>Register</Button>
                    </Link>
                </p>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (userForm) => {
            dispatch(actions.acLoginFormRequest(userForm));
        },
        setLogin: () => {
            dispatch(actions.loadUser());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));

