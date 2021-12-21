import React from 'react';
import { acFetchPostRequest, showPostModal, setShowToast } from '.././actions/index';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Cart from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartPost from '../components/CartPost';
import AddPost from '../components/AddPost';
import addIcon from '.././assets/plus-circle-fill.svg';
import Toast from 'react-bootstrap/Toast';
import UpdatePost from '../components/UpdatePost';

class Dashboard extends React.Component {
    componentDidMount = () => {
        this.props.fetchPosts();
    }
    onClickSetAddPost = () => {
        this.props.showModal();
    }
    onCloseToast = () => {
        this.props.showToast(false, '', null)
    }
    render() {
        let body;
        const { posts, postLoading } = this.props.posts;
        const { show, message, type } = this.props.toast;
        if (postLoading) {
            body = (
                <div className="spinner-container">
                    <Spinner variant='info' animation='border' />
                </div>
            )
        } else if (posts.length === 0) {
            body = (
                <>
                    <Cart className='text-center mx-5 my-5'>
                        <Cart.Header as='h1'>Hello {this.props.user.user.username}</Cart.Header>
                        <Cart.Body>
                            <Cart.Title >Welcome to learnIt</Cart.Title>
                            <Cart.Text>Click the button below to track your first skill to learn</Cart.Text>
                            <Button variant='primary' onClick={() => this.onClickSetAddPost()}>LearnIt</Button>
                        </Cart.Body>
                    </Cart>
                </>
            )
        } else {
            body = (
                <>
                    <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                        {posts.map(post => (
                            <Col key={post._id} className='my-2'>
                                <CartPost post={post} />
                            </Col>
                        ))}
                    </Row>
                    <Button className='btn-floating' onClick={() => this.onClickSetAddPost()}>
                        <img src={addIcon} alt='add' width='60' height='60' />
                    </Button>
                </>
            )
        }
        return (
            <>
                {body}
                {this.props.post === null && <AddPost />}
                {this.props.post !== null && <UpdatePost />}
                <Toast show={show} style={{ position: 'fixed', top: '20%', right: '10px' }}
                    className={`bg-${type} text-dark shadow`}
                    onClose={
                        () => this.onCloseToast()
                    }
                    delay={1000}
                    autohide
                >
                    <Toast.Body>
                        <strong>{message}</strong>
                    </Toast.Body>
                </Toast>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        posts: state.posts,
        user: state.checkLogin,
        toast: state.showToast,
        post: state.posts.post
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPosts: () => {
            dispatch(acFetchPostRequest());
        },
        showModal: () => {
            dispatch(showPostModal(true));
        },
        showToast: (isTrue, message, type) => {
            dispatch(setShowToast(isTrue, message, type));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
