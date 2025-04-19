const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports.SignUp = async function (req, res) {
    console.log(req.body);
    const { username, email, password } = req.body;
    try {
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const newUser = new User({ name: username, email: email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({
             id: newUser._id.toString()
        }, process.env.JWT_SECRET,
            {expiresIn:'3d'}
        );
        //res.status(201).send('User registerd successfully');
          res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
             id: newUser._id.toString(),
              username: newUser.username,
              email: newUser.email,
            },
          });
        console.log(`${username} is logged in successfully`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
};
