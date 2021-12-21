import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, withRouter } from 'react-router-dom'
import AlertMessage from './AlertMessage'
import { registerUser } from '.././utils/callerAPI'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            alert: ''
        }
    }
    onChangeRegister = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmitRegister = async (event) => {
        event.preventDefault();
        const { username, password, confirm } = this.state;

        if (password !== confirm) {
            this.setState({
                ...alert,
                alert: "Password and Confirm password must match"
            })
            setTimeout(() => this.setState({
                ...alert,
                alert: ''
            }), 2000)
            return;
        }
        try {
            const registerForm = {
                username: username,
                password: password,
                confirm: confirm
            }
            const registerData = await registerUser(registerForm);
            if (registerData.success) {
                this.props.history.push('/login');
            } else {
                this.setState({
                    ...alert,
                    alert: registerData.message
                })
                setTimeout(() => this.setState({
                    ...alert,
                    alert: ''
                }), 2000)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    render() {
        const { username, password, confirm, alert } = this.state;
        return (
            <>
                <Form className='my-4' onSubmit={this.onSubmitRegister}>
                    <AlertMessage message={alert} />
                    <Form.Group >
                        <Form.Control type='text'
                            placeholder='Enter email'
                            name='username'
                            require='true'
                            value={username}
                            onChange={this.onChangeRegister}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control type='password'
                            placeholder='Password'
                            name='password'
                            require='true'
                            value={password}
                            onChange={this.onChangeRegister}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control type='password'
                            placeholder='Confirm Password'
                            name='confirm'
                            require='true'
                            value={confirm}
                            onChange={this.onChangeRegister}
                        />
                    </Form.Group>
                    <Button variant='success' type='submit'>Register</Button>
                </Form>
                <p>Already have an account?
                &nbsp;
                <Link to='/login'>
                        <Button variant='info' size='sm' className='ml-2'>Login</Button>
                    </Link>
                </p>
            </>
        )
    }
}

export default withRouter(RegisterForm)
