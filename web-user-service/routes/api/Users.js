const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input validation
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

// Load User model
const User = require('../../model/Users');

// Load Profile model
const Profile = require('../../model/Profiles');

// @route    GET api/users/test
// @desc     Tests users route
// @access   Public
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

// @route    POST api/users/login
// @desc     User Login
// @access   Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(user => {

        // Check for user
        if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = { id: user.id, name: user.name, avatar: user.avatar } // Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }
                    }
                );
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});

// @route    POST api/users/register
// @desc     User register
// @access   Public
router.post('/register',(req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;

    User.findOne({ email: req.body.email }).then(user => {

        // Check for email
        if (user) {
            errors.email = 'Email already exists';
            return res.status(403).json(errors);
        } else {
            // Create new user
            const newUser = new User({
                name: name,
                email: email,
                password: password,
                avatar: avatar
            });

            // Encrypt the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.status(201).json(user))
                            .catch(err => res.status(500).json(err));
                    }
                });
            });
        }
    });
});

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar 
        });
    }  
);

// @route   POST api/users/avatar
// @desc    Upload new avatar 
// @access  Private
router.post('/avatar',  passport.authenticate('jwt', { session: false }), (req, res) => {

        const newUser = {
            avatar: req.body.avatar
        }

        User.findByIdAndUpdate(
            { _id: req.user.id },
            { $set: newUser },
            { new: true }
        ).then(user => {
            // Create new token
            // Create JWT payload
            const payload = { id: user.id, name: user.name, avatar: user.avatar }

            // Sign Token
            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) {
                        res.json(500).json(err);
                    } else {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                }
            );
        }).catch(err => res.status(500).json(err));
});

// @route   DELETE api/users
// @desc    Delete user and profile and items
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findByIdAndDelete( req.user.id ).then(user => {
        res.json({ delete: "Success" });
    }).catch(err => res.status(500).json(err));
});

module.exports = router;