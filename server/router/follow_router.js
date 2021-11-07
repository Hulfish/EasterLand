const Router = require("express");
const { body } = require("express-validator");
const followController = require("../controllers/follow-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const followrouter = Router();

followrouter.get("/get_friends/:id", authMiddleware, followController.getFriends)
followrouter.get("/get_subscriptions/:id", authMiddleware, followController.getSubscriptions)
followrouter.get("/get_subscribers/:id", authMiddleware, followController.getSubscribers)
followrouter.get("/subscribe_to/:id", authMiddleware, followController.subscribeTo)
followrouter.get("/unsubscribe_to/:id", authMiddleware, followController.unsubscribeTo)

// followrouter.post("/add_to_friends_request/:userId", authMiddleware)
// followrouter.post("/confirm_add_tp_friends/:userId", authMiddleware)

module.exports = followrouter
