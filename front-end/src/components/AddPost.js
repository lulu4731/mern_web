import React, { useState } from 'react';
import From from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { showPostModal, acAddPostRequest, acFetchPostRequest, setShowToast } from '.././actions/index'

const AddPost = ({ show, showPostModal, acAddPostRequest, setShowToast }) => {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })
    const closeDialog = () => {
        showPostModal(false);
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
    }
    const onAddPost = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    }
    const onSubmitNewPostFrom = async (event) => {
        event.preventDefault();
        const { message, success } = await acAddPostRequest(newPost);
        setShowToast(success, message, success === true ? 'success' : 'danger');
        closeDialog();
    }
    const { title, description, url } = newPost;
    return (
        <Modal show={show} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <From onSubmit={onSubmitNewPostFrom}>
                <Modal.Body>
                    <From.Group>
                        <From.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help'
                            value={title}
                            onChange={onAddPost}
                        />
                        <From.Text id='title-help' muted>Required</From.Text>
                    </From.Group>
                    <From.Group>
                        <From.Control as='textarea' row={3} placeholder='Description' name='description'
                            value={description}
                            onChange={onAddPost}
                        />
                    </From.Group>
                    <From.Group>
                        <From.Control type='text' placeholder='YouTube Tutorial URL' name='url'
                            value={url}
                            onChange={onAddPost}
                        />
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
    }
}
export default connect(mapStateToProps, { showPostModal, acAddPostRequest, acFetchPostRequest, setShowToast })(AddPost)
