import React from 'react';
import Cart from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ActionButton from './ActionButton';

const CartPost = ({ post: { _id, title, description, status, url } }) => {
    return (
        <>
            <Cart className='shadow' border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
                <Cart.Body>
                    <Cart.Title>
                        <Row>
                            <Col>
                                <p className='post-title'>{title}</p>
                                <Badge pill variant={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>{status}</Badge>
                            </Col>
                            <Col className='text-right'>
                                <ActionButton url={url} _id={_id} />
                            </Col>
                        </Row>
                    </Cart.Title>
                    <Cart.Text>{description}</Cart.Text>
                </Cart.Body>
            </Cart>
        </>
    )
}

export default CartPost
