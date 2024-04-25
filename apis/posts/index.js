const  express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const { allPosts, createPost, postbyId } =  require("./postController");



router.get('/', allPosts);
router.get('/:id', postbyId);
router.post('/', upload.single('file'), createPost);


module.exports = router;
