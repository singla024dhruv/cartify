const express = require("express"); //if forget search express routing on google
const router = express.Router();
console.log("router is loaded");
const user_controller = require('../controllers/user_controller');
const verifyToken = require("../middlewares/auth");
router.post('/register', user_controller.SignUp);
router.post('/login', user_controller.Login);
router.get('/me',verifyToken, user_controller.selfdetails);
module.exports = router;