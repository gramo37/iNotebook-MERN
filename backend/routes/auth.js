var express = require('express');
const User = require("../models/User");
const router = express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

const SECRET_KEY = "Something very complicated @##@!"

// Route 1 : Create a new user
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be greater than 5 letters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    // Show errors for bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // Check if there is any user with the entered mail
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, "msg": "Email already exists !!" });
        }

        // Create a user
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        data = {
            user: {
                id: user.id
            }
        }

        var token = jwt.sign(data, SECRET_KEY);

        success = true;
        return res.json({ success, "msg": token })
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).json({ success, "msg": "Something went wrong" })
    }
})

// Route 2: Login a User
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Wrong Password').exists()
], async (req, res) => {

    let success = false;
    // Show errors for bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        const {email, password} = req.body;
        
        // Check if there is any user with the entered mail
        let user = await User.findOne({email});
        if (!user) {
            // console.log("email error");
            return res.status(400).json({ success, "msg": "Please enter correct credentials" });
        }

        // Check if the entered password is correct or wrong
        const comparedPassword = await bcrypt.compare(password, user.password);
        if(!comparedPassword) {
            return res.status(400).json({ success, "msg": "Please enter correct credentials" });
        }

        // return res.json({ "msg": "Mail registered" })
        data = {
            user: {
                id: user.id
            }
        }

        var token = jwt.sign(data, SECRET_KEY);
        success = true;
        return res.json({ success, "msg": token })
        // res.json({"msg": "sagla zala"})
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).json({ success, "msg": "Something went wrong" })
    }
})

//Route 3: Get user details using his token
router.post('/getuser', fetchuser , async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message)
        return res.status(401).json({ "msg": "Please Authenticate with a correct token." });
    }
})

module.exports = router