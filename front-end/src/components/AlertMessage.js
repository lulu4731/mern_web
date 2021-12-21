import React from 'react';
import Alert from 'react-bootstrap/Alert';


class AlertMessage extends React.Component {
    render() {
        const { message } = this.props;
        return message === "" ? "" : (
            <Alert variant='danger'>{message}</Alert>
        );
    }
}
export default AlertMessage;