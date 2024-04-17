const User = require("../Model/UserModel")
var passwordValidator = require('password-validator');
const bcrypt = require("bcrypt")
const sendEmail = require('../utils/sendMail');
const jwt = require("jsonwebtoken");


// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
    .is().min(6)
    .is().max(10)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().symbols(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);


exports.newRegister = async (req, res) => {
    if (req.body.password && schema.validate(req.body.password)) {
        let data = new User(req.body)
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
            if (error)
                res.status(500).json({
                    mess: "Internal Server Error"
                })
            else {
                data.password = hash
                try {
                    await data.save()
                    res.status(200).json({
                        success: true,
                        mess: "Record created"
                    })
                    await sendEmail({
                        email: data.email,
                        subject: 'Welcome to our Shop',
                        message: 'Thank you for registering with us!'
                    });

                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
    else {
        res.status(400).json({
            success: false,
            res: "Please Enter a vaild password"
        })
    }
}

exports.login = async (req, res) => {
    try {
        // console.log(req.body.userName);
        let data = await User.findOne({
            $or: [
                { userName: req.body.userName },
                { email: req.body.userName }
            ]
        })
            if (data && await bcrypt.compare(req.body.password, data.password)) {
                let key = data.role == "Admin" ? process.env.JWT_SALT_KEY_ADMIN : process.env.JWT_SALT_KEY_BUYER
                jwt.sign({ data }, key, { expiresIn: 1296000 }, (error, token) => {
                    if (error)
                        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
                    else {
                        res.status(200).json({
                            result: "Done",
                            data: data,
                            token: token
                        })
                    }
                })
            }
            else
                res.send({ status: 401, result: "Fail", message: "Invalid Username or Password" })
        }
     catch (error) {
        console.log(error);
    }
}

exports.getByUserId = async (req,res)=>{
    try {
        let userDetails =await User.findOne({_id:req.params._id})
        res.status(200).json({
            success:true,
            data:userDetails
        })
    } catch (error) {
        console.log(error);
    }
}

// const User = require('../Model/UserModel');
// const sendEmail = require('../utils/sendMail');
// const sendToken = require("../utils/sendToken")

// // New User Register
// exports.newRegister = async (req, res) => {
//     try {
//         const { name, userName, email, phone, password } = req.body;

//         // Validate inputs
//         if (!name || !userName || !email || !phone || !password) {
//             return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: 'User already exists.' });
//         }

//         // Create new user
//         const newUser = new User({
//             name, userName, email, phone, password
//         })

//         await newUser.save();

//         // Send welcome email (optional)
//         await sendEmail({
//             email: newUser.email,
//             subject: 'Welcome to our Shop',
//             message: 'Thank you for registering with us!'
//         });


//         res.status(200).json({
//             success: true,
//             data: newUser
//         })
//     } catch (error) {
//         console.error('Error in registering user:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// // Login User
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validate inputs
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: 'Please provide email and password.' });
//         }

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ success: false, message: 'Invalid email or password.' });
//         }

//         // Check password
//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, message: 'Invalid email or password.' });
//         }

//         // Send token
//         await sendToken(user, res, 200);


//     } catch (error) {
//         console.error('Error in user login:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };


// // Logout User and clear Token in Cookies
// exports.logout = async (req, res) => {
//     try {
//         // Clear token in cookies
//         res.clearCookie('token');
//         res.status(200).json({ success: true, message: 'User logged out successfully.' });
//     } catch (error) {
//         console.error('Error in user logout:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// // Get All Users
// exports.getAllUsers = async (req, res) => {
//     try {
//         // Fetch all users, excluding the password field
//         const users = await User.find({}, { password: 0 });

//         res.status(200).json({ success: true, data: users });
//     } catch (error) {
//         console.error('Error in fetching users:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// // Middleware to retrieve token from cookies
// exports.getTokenFromCookies = (req, res, next) => {
//     try {
//         // Check if token exists in cookies
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({ success: false, message: 'Token not found in cookies.' });
//         }
//         res.status(200).json({
//             success: true, message: 'Token  found in cookies.', data: token
//         })


//         next();
//     } catch (error) {
//         console.error('Error in getTokenFromCookies middleware:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };


// // Delete User by Id
// exports.deleteUserById = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Validate userId
//         if (!userId) {
//             return res.status(400).json({ success: false, message: 'Please provide userId.' });
//         }

//         // Find user and delete
//         await User.findByIdAndDelete(userId);
//         res.status(200).json({ success: true, message: 'User deleted successfully.' });
//     } catch (error) {
//         console.error('Error in deleting user:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };