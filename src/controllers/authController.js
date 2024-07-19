const authService = require('../services/authService');
const { validateRegister, validateLogin } = require('../utils/validation');

const registerController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = validateRegister.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "ERROR",
                message:error.details[0].message 
            });
        }
        const user = await authService.register(email, password);
        res.status(201).json({
            status: "SUCCESS",
            data: {
                email: user.email
            }
        });
    } 
    catch (err) {
        next(err);
    }
};

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = validateLogin.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { token, user } = await authService.login(email, password);
        res.cookie('token', token, { httpOnly: true });
        res.send(user);
    } 
    catch (err) {
        next(err);
    }
};

const logoutController = async (req, res, next) => {
    try {
        await authService.logout(req.user.id);
        res.clearCookie('token');
        res.send('Logged out successfully');
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    registerController,
    loginController,
    logoutController
};