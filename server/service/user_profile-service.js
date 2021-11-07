const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const userPostModel = require("../models/userPost-model");

class userProfileService {
  async get_profile_data(req, res) {
    try {
      const userId = req.params.id;
      const user = await userModel.findById(userId);
      // console.log("userId:", userId, ", user: ", user);
      if (!user) {
        return res.status(404).send();
      }
      res.send({ userData: user });
    } catch (e) {
      res.status(500).send();
      console.log(e);
    }
  }

  async get_profile_posts(req, res) {
    try {
      const userId = req.params.id;
      const user = await userModel.findById(userId);
      // console.log("userId:", userId, ", user: ", user);
      if (!user) {
        return res.status(404).send();
      }

      const postsUnnamed = await userPostModel.find({ user: userId });

      if (!postsUnnamed[0]) {
        return res.status(200).send("no posts");
      }

      const posts = await definer.definePostAuthors(postsUnnamed);

      for (let post of posts) {
        const commentaries = post.commentaries;
        const commentaries_named = await definer.defineCommentsAuthors(
          commentaries.commentaries,
        );
        // console.log(commentaries_named)
      }
      res.send({ posts: posts });
    } catch (e) {
      res.status(500).send();
      console.log(e);
    }
  }

  async getUserAdditionalInfo(req, res) {
    try {
      let id = req.params.userId;
      // console.log(id, "HEre");

      const user = await userModel.findById(id);
      if (!user) {
        res.status(404).json({ message: "User is not found" });
      }

      const additInfo = user.addit_info;

      res.send({ additInfo });
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
  async updateUserAdditionalInfo(req, res) {
    try {
      // console.log(req.body.body);
      const additInfo = req.body.body;
      const [school, city, country, relationships] = [
        additInfo.school,
        additInfo.city,
        additInfo.country,
        additInfo.relationships,
      ];
      const token = req.headers.authorization.split(" ")[1];
      const id = jwt.verify(token, process.env.JWT_ACCESS_SECRET).id;

      const user = await userModel.findById(id);

      user.addit_info = {
        school,
        country,
        city,
        relationships,
      };
      await user.save();

      res.status(201).send({ user });
    } catch (e) {
      res.status(500).send();
      console.log(e);
    }
  }
  async getUserName (req, res) {
    const userId = req.body.userId
    const user = await userModel.findById(userId)
    const fullname = user.name + " " + user.surname 

    res.json({fullname})
  }
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
  static async defineCommentsAuthors(comments) {
    if (!comments[0]) {
      return 0;
    }
    // console.log("comments", comments)
    // console.log("something like this");
    let nameBuffer = {};
    let dbReqsCounter = 0;
    for (let comment of comments) {
      const id = comment.user;
      // console.log(id);
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

module.exports = new userProfileService();
