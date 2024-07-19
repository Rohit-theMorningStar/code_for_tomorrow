const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../utils/db');

const secretKey = process.env.JWT_SECRET;

/* generate Token */
const generateToken = async (user) => {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
};

/* new registration */


const register = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const isDuplicateEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (isDuplicateEmail) {
            throw "Duplicate Email Found..."
        }
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            },
        });
        return user;
    } catch (error) {
        throw "user unable to register"
    }

};


/* login registered user */

const login = async (email, password) => {

    try {
        let user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        const token = await generateToken(user);
        user = await prisma.user.update({
            where: { id: user.id },
            data: { sessionToken: token },
        });

        return { token, user };

    } catch (error) {

    }

};


/* logout logged in user */

const logout = async (userId) => {

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { sessionToken: null },
        });
    } catch (error) {

    }
};

module.exports = {
    register,
    login,
    logout
};