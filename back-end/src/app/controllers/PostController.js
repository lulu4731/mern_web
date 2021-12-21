const { find } = require('../model/Post');
const Post = require('../model/Post');

class PostController {
    //[GET /]
    getPost = async (req, res) => {
        try {
            const posts = await Post.find({ user: req.userId })
            res.json({ success: true, posts });
        } catch (error) {
            return res
                .status(500).json({ success: false, message: 'Server error' });
        }
    }
    //[POST /add]
    addPost = async (req, res) => {
        const { title, description, url, status } = req.body;
        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: 'Title is require' });
        }
        try {
            const newPost = new Post({
                title,
                description,
                url: (url.startsWith('https://')) ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId,
            });
            await newPost.save()
            res.json({ success: true, message: 'Happy leaning', post: newPost });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Server error' });
        }
    }
    //[PUT /:id]
    updatePost = async (req, res) => {
        const { title, description, url, status } = req.body;
        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: 'Title is require' })
        }
        try {
            let updatePost = {
                title: title,
                description: description,
                url: (url.startsWith('https://')) ? url : `https://${url}`,
                status: status || 'TO LEARN'
            }
            const updatePostCondition = { _id: req.params.id, user: req.userId };
            updatePost = await Post.findOneAndUpdate(
                updatePostCondition,
                updatePost,
                { new: true }
            )
            if (!updatePost) {
                return res
                    .status(401)
                    .json({ success: false, message: 'Post not found or user author' });
            }
            res.json({ success: true, message: 'Update successfully', post: updatePost });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Server error' });
        }
    }
    //[DELETE /:id]
    deletePost = async (req, res) => {
        try {
            const deletePostCondition = { _id: req.params.id, user: req.userId };
            const deletePost = await Post.findOneAndDelete(deletePostCondition);
            if (!deletePost) {
                return res
                    .status(401)
                    .json({ success: false, message: 'Post not found or user author' });
            }
            res.json({ success: true, message: 'Delete successfully' });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Server error' });

        }
    }
}

module.exports = new PostController;