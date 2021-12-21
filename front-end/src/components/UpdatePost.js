import React, { useState, useEffect } from 'react';
import From from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { showPostModal, acUpdateRequest, setShowToast, setUpdatePost } from '.././actions/index'

const UpdatePost = ({ show, showPostModal, acUpdateRequest, setShowToast, post, setUpdatePost }) => {
    const [newPost, setNewPost] = useState(
        post);
    useEffect(() => setNewPost(
        post
    ), [post])
    const closeDialog = () => {
        showPostModal(false);
        setNewPost(post);
        setUpdatePost();
    }
    const onUpdatePost = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    }
    const onSubmitUpdatePost = async (event) => {
        event.preventDefault();
        const { message, success } = await acUpdateRequest(newPost);
        setShowToast(success, message, success === true ? 'success' : 'danger');
        closeDialog();
    }
    const { title, description, url, status } = newPost;
    return (
        <Modal show={show} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <From onSubmit={onSubmitUpdatePost}>
                <Modal.Body>
                    <From.Group>
                        <From.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help'
                            value={title}
                            onChange={onUpdatePost}
                        />
                        <From.Text id='title-help' muted>Required</From.Text>
                    </From.Group>
                    <From.Group>
                        <From.Control as='textarea' row={3} placeholder='Description' name='description'
                            value={description}
                            onChange={onUpdatePost}
                        />
                    </From.Group>
                    <From.Group>
                        <From.Control type='text' placeholder='YouTube Tutorial URL' name='url'
                            value={url}
                            onChange={onUpdatePost}
                        />
                    </From.Group>
                    <From.Group>
                        <From.Control as='select' name='status'
                            value={status}
                            onChange={onUpdatePost}
                        >
                            <option value='TO_LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </From.Control>
                    </From.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>LearnIt</Button>
                </Modal.Footer>
            </From>
        </Modal>
    )
}
const mapStateToProps = state => {
    return {
        show: state.addPostModal,
        post: state.posts.post
    }
}
export default connect(mapStateToProps, { showPostModal, acUpdateRequest, setShowToast, setUpdatePost })(UpdatePost)
