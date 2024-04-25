const  express = require('express');

const posts = require('../apis/posts/index');

const router = express.Router();

router.use('/posts', posts);


const parentRouter = express.Router();
parentRouter.use('/api', router);

module.exports = parentRouter;

