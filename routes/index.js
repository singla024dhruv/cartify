const express = require("express"); //if forget search express routing on google
const router = express.Router();
console.log("router is loaded");
const user_controller = require('../controllers/user_controller');
const { getActivities } = require("../controllers/activity_logs");
const verifyToken = require("../middlewares/auth");
router.post('/register', user_controller.SignUp);
router.post('/login', user_controller.Login);
router.get('/me', verifyToken, user_controller.selfdetails);

router.get('/admin/activity-logs', getActivities);
router.use('./product', require('./productRoutes'));

router.use('./cart', require('./cart'));
module.exports = router;
