let posts = [
    {"id": 1, "title": "Post 1", "content": "This is post 1"},
    {"id": 2, "title": "Post 2", "content": "This is post 2"},
    {"id": 3, "title": "Post 3", "content": "This is post "},
];

// @desc  Get all posts
// @route GET /api/posts
export const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.json(posts.slice(0, limit));
    }
    res.json(posts);
};

// @desc  Get single post
// @route GET /api/posts/:id
export  const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        const error = new Error(`Post with id ${id} not found`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);
};

// @desc  Create a new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
    const {title, content} = req.body;
    if (!title || !content) {
        const error = new Error('Please include both title and content');
        error.status = 400;
        return next(error);
    }
    const newPost = {
        id: posts.length + 1,
        title,
        content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
};

// @desc  Update a post
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
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
    res.json(post);
};

// @desc  Delete a post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) {
        const error = new Error(`Post with id ${id} not found`);
        error.status = 400;
        return next(error);
    }
    posts = posts.filter(post => post.id !== id);
    res.status(200).json(posts);
};

