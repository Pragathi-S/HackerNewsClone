const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// inserting new registration
exports.register = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await User.create({
            username
        });

        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

// validating login details
exports.login = async (req, res, next) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return next(new ErrorResponse("Username not registered", 401));
        }

        sendToken(user, 200, res);

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// user token
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};