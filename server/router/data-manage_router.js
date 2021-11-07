const Router = require("express");
const userConroller = require("../controllers/user-conroller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const dataService = require("../service/data-service");
const userProfileService = require("../service/user_profile-service");
const userService = require("../service/user-service");
const {
  Post_initialize_service,
  Post_edit_service,
} = require("../service/post_actions-service");
const dataManagerouter = Router();

dataManagerouter.post("/delete_user", authMiddleware, userService.deleteUser); //delete user; for admins; for users that want to delete their own account

dataManagerouter.post("/search", authMiddleware, dataService.search); //search user endpoint

//rename it all into 'getProfileData', 'getProfilePosts'...

dataManagerouter.post(
  "/userData/createUserPost",
  authMiddleware,
  Post_initialize_service.createUserPost,
); //creating account
dataManagerouter.post(
  "/userData/getPosts/limited",
  authMiddleware,
  dataService.getPostsLimited,
); //for explorePage
dataManagerouter.get(
  "/userData/getUserPosts",
  authMiddleware,
  dataService.getUserPosts,
); // for getting user`s profiles posts
dataManagerouter.get(
  "/userData/getUserData",
  authMiddleware,
  dataService.getUserData,
); // for loading main user`s profile info like name
dataManagerouter.get(
  "/userData/getUserAdditionalInfo/:userId",
  authMiddleware,
  userProfileService.getUserAdditionalInfo,
); //
dataManagerouter.post(
  "/userData/updateUserAdditionalInfo",
  authMiddleware,
  userProfileService.updateUserAdditionalInfo,
); //
dataManagerouter.get(
  "/userData/guest_getUserPosts/:userId",
  authMiddleware,
  dataService.guest_getUserPosts,
); //i`ll get rid of it
dataManagerouter.get(
  "/userData/guest_getUserData/:userId",
  authMiddleware,
  dataService.guest_getUserData,
); // and of it // i want to make it only in two endpoints that will define what to send by themselves, so that will simplify functional and...


dataManagerouter.get(
  "/get_profile_data/:id",
  authMiddleware,
  userProfileService.get_profile_data,
);

dataManagerouter.get(
    "/get_profile_posts/:id",
    authMiddleware,
    userProfileService.get_profile_posts,
);

dataManagerouter.post(
  "/get_user_name",
  authMiddleware,
  userProfileService.getUserName
)

dataManagerouter.get("/check_is_admin", authMiddleware, dataService.checkAdmin);

module.exports = dataManagerouter;
