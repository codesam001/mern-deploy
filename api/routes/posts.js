
const express  = require("express")
const router = express.Router();
const User = require("../models/User")
const Post = require("../models/Post")


//This  is write page where you can CRUD the post 


//Create
router.post("/",async (req, res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save(); 
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
});






//Update Post 
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(
                    req.params.id, 
                    {
                        $set: req.body, 
                    }, 
                    {new : true}
                );
                res.status(200).json(updatePost)
            } catch (err) {
                res.status(500).json(err)
            } 
          }  else{
                res.status(401).json("you can update only your post!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
  });



//Delete Post 


//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });




//Get Post

router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  //Get All Post   -- we are featching all post with query 
  router.get("/", async (req, res) => {
    const username = req.query.user; //it is imp to create an object 
    const catName = req.query.cat;
    try {

      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });                  
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });




module.exports = router;

















