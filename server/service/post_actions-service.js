const jwt = require ("jsonwebtoken");
const Comment = require("../classes/cls_comment");
const CommentResponse = require("../classes/cls_comment_response")
const userPostModel = require("../models/userPost-model");


class Post_initialize_service {
  async createUserPost(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const post = req.body.post;
      const userId = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      ).id;
      // console.log(post.postBody);
      userPostModel.create({
        user: userId,
        post_text: post.postBody,
        date: post.date,
      });
      res.status(201).send({ message: "post created!" });
    } catch (e) {
      console.log(e);
    }
  }

  async getUserPosts(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      // console.log("UserPosts getting");
      const userId = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      ).id;

      const postsUnnamed = await userPostModel.find({ user: userId });

      const posts = await definer.definePostAuthors(postsUnnamed);

      for (let post of posts) {
        const commentaries = post.commentaries;
        const commentaries_named = await definer.defineCommentsAuthors(
          commentaries.commentaries,
        );
        // console.log(commentaries_named);
      }

      const likedList = checkPostsListIsLiked(posts, userId);

      if (!posts) {
        res.status(404).send();
      }
      res.send({ posts, likedList });
    } catch (e) {
      res.status(500);
      console.log(e);
    }
    function checkPostsListIsLiked(posts, userId) {
      const likedList = {};
      // console.log(JSON.stringify(posts[0].user) == JSON.stringify(userId));
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (post.likes.users.includes(userId)) {
          likedList[post._id] = true;
        }
      }
      // console.log("arr: ", likedList);

      return likedList;
    }
  }
  async getPostsLimited(req, res) {
    try {
      const limit = req.body.amount;

      const postsUnnamed = await userPostModel.find().limit(limit);

      const posts = await definer.definePostAuthors(postsUnnamed);

      res.status(200).send({ posts });
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
  async guest_getUserPosts(req, res) {
    try {
      const userId = req.params.userId;
      const postsUnnamed = await userPostModel.find({ user: userId });
      const posts = await definer.definePostAuthors(postsUnnamed);

      if (!posts) {
        res.status(404).send();
      }
      res.send({ posts });
    } catch (e) {
      console.log(e);
    }
  } //remove 
}

class Post_edit_service {
    async likeUserPost(req, res) {
        try {
          const refreshToken = req.cookies.refreshToken;
          const userId = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
          ).id;
          if (!userId) {
            res.status(500).json({ message: "user is not defined" }).send();
          }
          const postId = req.body.postId;
          const post = await userPostModel.findById(postId);
          if (!post) {
            res.status(500).json("post is not found").send();
          }
          // console.log(post);
    
          const likedIndex = defineIsLiked(post.likes.users, userId);
    
          if (likedIndex) {
            const postLikes = post.likes;
            --postLikes.amount;
            postLikes.users.splice(likedIndex - 1, 1);
            post.save();
            return res.status(201).send();
          }
    
          const postLikes = post.likes;
          ++postLikes.amount;
          postLikes.users.push(userId);
          await post.save();
          res.status(201).send();
        } catch (e) {
          console.log(e);
          res.send(500);
        }
    
        function defineIsLiked(users, id) {
          for (let i = 0; i < users.length; i++) {
            // console.log(users[i]);
            if (users[i] === id) {
              return i + 1;
            }
          }
          return 0;
        }
    }
    async commentUserPost(req, res) {
        try {
          const refreshToken = req.cookies.refreshToken;
          const userId = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
          ).id;
          if (!userId) {
            res.status(500).json({ message: "user is not defined" }).send();
          }
          const postId = req.body.postId;
          const post = await userPostModel.findById(postId);
          if (!post) {
            res.status(500).json("post is not found").send();
          }
    
          // console.log("post:", post);
    
          const commentsMenu = post.commentaries;
    
          commentsMenu.commentaries.push(new Comment(req.body.text, userId, commentsMenu.amount));

          const commentId = commentsMenu.amount


          ++commentsMenu.amount;
          // console.log("commentsMenu: ", commentsMenu)
          if (!commentsMenu.users.includes(userId)) {
            commentsMenu.users.push(userId);
          }
    
          await post.save();
          res.status(201).json({commentId});
        } catch (e) {
          console.log(e);
          res.send(500);
        }
    }
    // async responseToComment(req, res) {
    //   try {
    //     const response_to_comment = req.body.responseToComment
    //     const {text, user, recipient_user, to_comment_id} = response_to_comment

    //     const post_id = response_to_comment.post_id
    //     const comment_path_raw = response_to_comment.path 
    //     const post = await userPostModel.findById(post_id)
    //     const comment_path = comment_path_raw.split("/")
    //     const comment_to_response = find_comment_by_path(post.commentaries.commentaries, comment_path)
    //     if (!comment_to_response.responses) {
    //       comment_to_response.responses = []
    //     }
    //     const comment_id = post.commentaries.amount
    //     const commentResponse = new CommentResponse(text, user, comment_id, recipient_user, to_comment_id )
    //     comment_to_response.responses.push({text, user}) //**  text, user, id, recipient_user, to_comment_id
    //     ++post.commentaries.amount;
    //     await post.save()
    //     const post_saved = await userPostModel.findById(post_id)
        
    //     res.json({message: "OK", comment_id})
    //   } catch (e) {
    //     console.log(e)
    //   }

    //   function find_comment_by_path (comments, path) {
    //     let counter = 0
    //     let node = comments
        
    //     for (let i = 0; i < path.length - 1; i++) {
    //       loop: for (let j = 0; j < comments.length; j++) {
    //         if (node[j].id == path[counter + 1] ) {
    //           if (path.length === 2) {
    //             return node[j]
    //           }
    //           node = node[j]
    //           counter ++
    //           break loop
    //         } 
    //       }
    //     }
    //     return node
    //   }
    // }
}

class definer {
    static async definePostAuthors(posts) {
      // console.log("something");
      let nameBuffer = {};
      let dbReqsCounter = 0;
      for (let post of posts) {
        const id = JSON.parse(JSON.stringify(post.user));
  
        if (nameBuffer[id]) {
          post.author = nameBuffer[id];
        } else {
          const user = await userModel.findById(id);
          const authorName = user.name + " " + user.surname;
          nameBuffer[id] = authorName;
          post.author = nameBuffer[id];
          dbReqsCounter++;
        }
      }
      // console.log(dbReqsCounter);
      return posts;
    }
    static async defineCommentsAuthors (comments) {
      if (!comments[0]) {
          return 0
      }
      // console.log("comments", comments)
      // console.log("something like this");
      let nameBuffer = {};
      let dbReqsCounter = 0;
      for (let comment of comments) {
        
        const id = (comment.user);
        // console.log(id)
        if (nameBuffer[id]) {
          comment.author = nameBuffer[id];
        } else {
          const user = await userModel.findById(id);
          const authorName = user.name + " " + user.surname;
          nameBuffer[id] = authorName;
          comment.author = nameBuffer[id];
          dbReqsCounter++;
        }
      }
      // console.log(dbReqsCounter);
      return comments;
    }
}

module.exports = {
  Post_initialize_service: new Post_initialize_service(),
  Post_edit_service: new Post_edit_service(),
};
