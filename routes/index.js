const express = require("express"); //if forget search express routing on google
const router = express.Router();
console.log("router is loaded");
const user_controller = require('../controllers/user_controller');
router.post('/register', user_controller.SignUp);
module.exports = router;