const db = require("../models");
//const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badRequest");
const jwt = require("jsonwebtoken");
const User = db.user;

const register = async (req, res) => {
    const { email, name, password } = req.body;
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new BadRequestError("Email already exists");
    }
    const isFirstAccount = (await User.count({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    const user = await User.create({ name, email, password, role });
    res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequestError("Invalid Credentials");
    }
    const token = jwt.sign(
        { userId: user._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
    res.status(StatusCodes.OK).json({
        user: { name: user.name, userId: user._id, role: user.role, token },
    });
};

module.exports = {
    register,
    login,
};
