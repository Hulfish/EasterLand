const followService = require("../service/follow-service");
const jwt = require("jsonwebtoken");

class FollowController {
  async getFriends(req, res) {
    try {
      res.send("friends");
    } catch (e) {
      console.log(e);
    }
  }

  async getSubscriptions(req, res) {
    try {
      const userId = req.params.id;
      const {subscriptions, usernames} = await followService.getSubscriptions(userId);
      res.json({ subscriptions, usernames });
    } catch (e) {
      console.log(e);
    }
  }

  async getSubscribers(req, res) {
    try {
      const userId = req.params.id;
      const {subscribers, usernames} = await followService.getSubscribers(userId);
      res.json({ subscribers, usernames });
    } catch (e) {
      console.log(e);
    }
  }
  async subscribeTo(req, res) {
    try {
      const id = req.params.id;
      const refreshToken = req.cookies.refreshToken;
      const userId = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      ).id;
      const result = await followService.subscribeTo(userId, id);
      res
        ? res.json({ message: "Subscribed" })
        : res.json({ message: "something went wrong" });
    } catch (e) {
      console.log(e);
    }
  }
  async unsubscribeTo(req, res) {
    try {
      const id = req.params.id;
      const refreshToken = req.cookies.refreshToken;
      const userId = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      ).id;
      const result = await followService.unsubscribeTo(userId, id);
      result
        ? res.json({ message: "Unsubscribed" })
        : res.json({ message: "something went wrong" });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new FollowController();
