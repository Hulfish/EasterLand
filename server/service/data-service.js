const jwt = require("jsonwebtoken");
const Comment = require("../classes/cls_comment");
const userModel = require("../models/user-model");
const userPostModel = require("../models/userPost-model");

class dataController {
  

  async getUserData(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userId = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      ).id;
      // console.log(userId);

      const user = await userModel.findById(userId);

      if (!user) {
        res.clearCookie("refreshToken");
        res.status(401).send();
      }
      // console.log("email: ", user.isAdmin);

      res.send({ userData: user });
    } catch (e) {
      res.status(500).send();
      console.log(e);
    }
    // console.log(req.cookies);
  }

  async guest_getUserData(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await userModel.findById(userId);
      if (!user) {
        res.status(404).send();
      }
      res.send({ userData: user });
    } catch (e) {
      res.status(404).send();
      console.log(e);
    }
    // console.log(req.cookies);
  }

  async search(req, res) {
    const searchReq = req.body;

    // console.log(searchReq);
    const searchResult = await userModel.find(searchReq);
    // console.log("Found: ", searchResult);
    // console.log("search_feature: ", search_feature )
    setTimeout(() => {
      res.send(searchResult);
    }, 1000);
  }

  async checkAdmin(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    const userId = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET).id;
    const user = await userModel.findById(userId);

    if (!user.isAdmin) {
      res.send({ isAdmin: false });
    }

    res.send({ isAdmin: true });
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
      
      if (!postsUnnamed[0]) {
        res.status(200).send("no posts")
      }
      
      const posts = await definer.definePostAuthors(postsUnnamed);
      
      for (let post of posts) {
        const commentaries = post.commentaries
        const commentaries_named = await definer.defineCommentsAuthors(commentaries.commentaries)
        // console.log(commentaries_named)
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
      // console.log("fff")
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
      if (!postsUnnamed) {
        res.status(200).send("no posts")
      }
      const posts = await definer.definePostAuthors(postsUnnamed);

      if (!posts) {
        res.status(404).send();
      }
      res.send({ posts });
    } catch (e) {
      console.log(e);
    }
  }

  
  
}

class definer {
  static async definePostAuthors(posts) {
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

module.exports = new dataController();
