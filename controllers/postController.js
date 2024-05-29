import Post from "../model/Post.js";
let posts = [
    {"id": 1, "title": "Post 1", "content": "This is post 1"},
    {"id": 2, "title": "Post 2", "content": "This is post 2"},
    {"id": 3, "title": "Post 3", "content": "This is post "},
];

// @desc  Get all posts
// @route GET /api/posts
export const getPosts = async (req, res, next) => {
    const limit = parseInt(req.query.limit);

    const posts = await Post.find();
    if (!isNaN(limit) && limit > 0) {
        return res.json(posts.slice(0, limit));
    }
    res.json(posts);
};

// @desc  Get single post
// @route GET /api/posts/:id
export  const getPost = async (req, res, next) => {
    const id = req.params.id;
    try{
        const post = await Post.findById(id).exec();

        if (!post) {
            const error = new Error(`Post with id ${id} not found`);
            error.status = 404;
            return next(error);
        }
        res.status(200).json(post);
    }catch (error) {
        console.error('Error fetching post: ', error);
        return next(error);
    }
};

// @desc  Create a new post
// @route POST /api/posts
export const createPost = async (req, res, next) => {
    const {title, content} = req.body;
    if (!title || !content) {
        const error = new Error('Please include both title and content');
        error.status = 400;
        return next(error);
    }
    const newPost = {
        title,
        content
    };
    try{
        const post = await Post.create(newPost);
        res.status(201).json(post);
    }catch (error){
        console.error('Error creating post: ', error);
        return next(error);
    }
};

// @desc  Update a post
// @route PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
    const { id } = req.params;
    try{
        const post = await Post.findById(id);
        if (!post) {
            const error = new Error(`Post with id ${id} not found`);
            error.status = 400;
            return next(error);
        }
        const {title, content} = req.body;
        if (!title || !content) {
            const error = new Error('Please include both title and content');
            error.status = 400;
            return next(error);
        }
        post.title = title;
        post.content = content;
        const updatedPost = await post.save();
        res.json(updatedPost);
    }catch (error){
        console.error('Error updating post: ', error);
        return next(error);
    }
};

// @desc  Delete a post
// @route DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
    const  {id} = req.params;
    try{
        const post = await Post.findById(id)
        if (!post) {
            const error = new Error(`Post with id ${id} not found`);
            error.status = 400;
            return next(error);
        }
        const deletedPost = await post.deleteOne({ _id: id }).orFail();
        res.status(200).json({
            message: `Post with id ${id} deleted successfully`
        });
    }catch (error){
        console.error('Error deleting post: ', error);
        return next(error);
    }
};

