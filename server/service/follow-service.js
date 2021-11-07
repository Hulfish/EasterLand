const userModel = require("../models/user-model");

class FollowService {
  async subscribeTo(subscriberId, id) {
    try {
      const subscriber = await userModel.findById(subscriberId);

      // console.log("Subscribes array: ", subscriber.subscriptions);
      subscriber.subscriptions.container.push(id);
      ++subscriber.subscriptions.amount;
      const subscribedTo_user = await userModel.findById(id);
      subscribedTo_user.subscribers.container.push(subscriberId);
      ++subscribedTo_user.subscribers.amount;
      await subscriber.save();
      await subscribedTo_user.save();
      return 1;
    } catch (e) {
      console.log(e);
    }
  }
  async unsubscribeTo(subscriberId, id) {
    try {
      const subscriber = await userModel.findById(subscriberId);

      subscriber.subscriptions.container =
        subscriber.subscriptions.container.filter((el) => {
          // console.log(el);
          if (el !== id) {
            return subscribe;
          }
        });

      const subscribedTo_user = await userModel.findById(id);
      subscribedTo_user.subscribers.container =
        subscribedTo_user.subscribers.container.filter((el) => {
          // console.log(el, 30, subscriberId);
          if (el !== subscriberId) {
            return el;
          }
        });

      --subscribedTo_user.subscribers.amount;
      --subscriber.subscriptions.amount;

      await subscriber.save();
      await subscribedTo_user.save();
      return 1;
    } catch (e) {
      console.log(e);
    }
  }
  async getSubscriptions(id) {
    try {
      const user = await userModel.findById(id);

      const subscriptions = user.subscriptions.container;
      const usernames = {};

      for (const subscription of subscriptions) {
        const user = await userModel.findById(subscription);
        usernames[subscription] = user.name + " " + user.surname;
      }

      return { subscriptions: user.subscriptions, usernames };
    } catch (e) {
      console.log(e);
    }
  }
  async getSubscribers(id) {
    try {
      const user = await userModel.findById(id);

      const subscribers = user.subscribers.container;
      const usernames = {};

      for (const subscriber of subscribers) {
        const user = await userModel.findById(subscriber);
        usernames[subscriber] = user.name + " " + user.surname;
      }

      return { subscribers: user.subscribers, usernames };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new FollowService();
