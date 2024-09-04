const jwt = require('jsonwebtoken');
const JWT_SECRET = "CRMPROJECT";
const Model = require('../models/userModel');
const authenticateToken = (req, res, next) => {

    const token  = req.headers["access_token"];
     console.log(token)
      if (token == null) return res.status(401).send('you are Unauthorized');

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Forbidden');
        
        req.user = user;
        next();
    });
};
const authorizeRole = (role) => {
    return (req, res, next) => { 
        
        if (req.user && req.user.rolename === role) {
           
            next(); // User has the required role, proceed to the route handler
        } else {
            res.status(403).send('You are not authorized to access this url'); // User does not have the required role
        }
    };
}

const { body, validationResult } = require('express-validator');

    const validateRegistration = [
        body('username').matches(/^[a-z0-9]+$/).withMessage('Username must contain only lowercase letters and digits').isLength({ min: 6 }).withMessage("Minimum characters for username is 6").notEmpty().withMessage("Username is required").isLength({ max: 15 }).withMessage("Minimum characters for username is 6"),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('phone').isMobilePhone().withMessage('Invalid phone number'),
        body('rolename').matches(/^[A-Z_]+$/).withMessage('Role name must contain only letters or underscores').notEmpty().withMessage('Role name is required'),
        body('confirmpassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    ];
    
const validateComplaint = [
    body('title')
        .matches(/^[A-Za-z ]+$/)
        .withMessage('Title must contain only letters and spaces')
        .notEmpty()
        .withMessage('Title is required'),

    body('description')
        .matches(/^[A-Za-z0-9 ]+$/)
        .withMessage('Description must contain only letters and spaces')
        .notEmpty()
        .withMessage('Description is required'),

    // body('status')
    //     .matches(/^[A-Za-z_]+$/)
    //     .withMessage('Status must contain only letters and underscores')
    //     .notEmpty()
    //     .withMessage('Status is required'),

    // body('assigned_to')
    // .isNumeric()
    //     .matches(/^[0-9]+$/)
    //     .withMessage('Assigned to must contain only numbers')
    //     .notEmpty()
    //     .withMessage('Assigned role is required'),

    // If you have additional validations for 'additional_text' or 'media', you can add them here
];


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    authenticateToken,
    validate,
    validateRegistration,
    validateComplaint,
    authorizeRole

};