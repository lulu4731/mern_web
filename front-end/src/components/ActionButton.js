import Button from 'react-bootstrap/Button';
import playIcon from '.././assets/play-btn.svg';
import editIcon from '.././assets/pencil.svg';
import deleteIcon from '.././assets/trash.svg';
import React from 'react';
import { connect } from 'react-redux';
import { acDeleteRequest, showPostModal, findPost } from '.././actions/index';


const ActionButton = ({ url, _id, acDeleteRequest, showPostModal, findPost, post }) => {
    const onDelete = () => {
        acDeleteRequest(_id);
    }
    const onDialog = () => {
        findPost(_id);
        showPostModal(true);
    }
    return (
        <>
            <Button className='post-button' href={url} target='_blank'>
                <img src={playIcon} alt='play' width='32' height='32' />
            </Button>
            <Button className='post-button' onClick={onDialog}>
                <img src={editIcon} alt='edit' width='24' height='24' />
            </Button>
            <Button className='post-button' onClick={onDelete}>
                <img src={deleteIcon} alt='delete' width='24' height='24' />
            </Button>
        </>
    )
}
const mapStateToProps = state => {
    return {
        post: state.posts.post
    }
}
export default connect(mapStateToProps, { acDeleteRequest, showPostModal, findPost })(ActionButton)
