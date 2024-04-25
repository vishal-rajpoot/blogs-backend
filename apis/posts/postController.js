const fs = require('fs');
const { allPostsService, createPostService, postbyIdService } = require("./postService");

const allPosts = async(req,res) => {
        try {
            const data = await allPostsService();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
}

const postbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await postbyIdService(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createPost = async (req, res) => {
    const payload = req.body;
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length-1];
    const newPath = path +'.' + extension;
    const newFilePath = newPath.replace(/\\/g, '/');
    fs.renameSync(path, newFilePath);
    const image = {
        image: newFilePath,
    }
    const newPayload = {
        title: payload.title,
        config: {
            summary: payload.summary,
            content: payload.content,
            image: image.image,
        }
    }
    try {
        const data = await createPostService(newPayload);
        return res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { allPosts, postbyId, createPost };