const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');
const redisClient = require('../config/redis');

const activityQueue = require('../config/bull');


module.exports.SignUp = asynchandler(async function (req, res) {
    console.log(req.body);
    const { username, email, password } = req.body;
   // try {
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const newUser = new User({ name: username, email: email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({
            id: newUser._id.toString()
        }, process.env.JWT_SECRET,
            { expiresIn: '3d' }
    );
    await activityQueue.add({
      userId: user._id,
      action: "SignUp",
      Timestamp: new Date(),
    });
        //res.status(201).send('User registerd successfully');
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id.toString(),
                username: newUser.name,
                email: newUser.email,
            },
        });
        console.log(`${username} is registered successfully`);
   // }
    // catch (err) {
    //     console.error(err);
    //     res.status(500).send('An error occurred');
    // }
});
    module.exports.Login = asynchandler(async function (req, res) {
        console.log("hello");
    const { email, password } = req.body;
    // try {
        const user = await User.findOne({ email: email });
        if (user) {
            const ans = await bcrypt.compare(password, user.password);
            if (ans) {
                const token = jwt.sign(
                    {
                        id: user._id.toString(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "3d" }
                );
                await activityQueue.add({
                    userId: user._id,
                    action: 'login',
                    Timestamp: new Date()
                });
                res.status(201).json({
                    message: "User Logged in successfully",
                    token,
                    user: {
                        id: user._id.toString(),
                        username: user.name,
                        email: user.email,
                    },
                });
                console.log(`${user} us logged in successfully`);
            }
        // }
    }
    // catch (err)
    // {
    //     console.log(err);
    //     }

});
module.exports.selfdetails = asynchandler(async function (req, res) {
    // try {
    const userId = req.user.id;
    const cachedUser = await redisClient.get(userId);
    if (cachedUser) {
        console.log('cache Hit');
        return res.status(200).json({
            source: 'cache',
            user: JSON.parse(cachedUser),
        });
    }
    console.log("cache miss");
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    // res.json(user);
    await activityQueue.add({
      userId: user._id,
      action: "get the self details",
      Timestamp: new Date(),
    });
    await redisClient.setEx(userId, 3600, JSON.stringify(user));
    res.status(200).json({
        source: 'db',
        user,
    });
    // }
    // catch (err) {
    //     res.status(500).json({ message: 'Server error' });
    // }
});