const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load Profile Model
const Profile = require('../../model/Profiles');

// @route   GET api/profiles/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => {
    res.json({ msg: "Profile Works" })
});

// @route   POST api/profiles
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        res.status(400).json(errors);
    }

    // Get fileds
    const profileField = {};
    profileField.user = req.user.id;
    if (req.body.familyName) profileField.familyName = req.body.familyName;
    if (req.body.lastName) profileField.lastName = req.body.lastName;
    if (req.body.birthday) profileField.birthday = req.body.birthday;
    if (req.body.telephoneNumber) profileField.telephoneNumber = req.body.telephoneNumber;
    if (req.body.state) profileField.state = req.body.state;
    if (req.body.city) profileField.city = req.body.city;
    
    // Social
    profileField.social = {}
    if (req.body.facebook) {
        profileField.social.facebook = req.body.facebook;
    }
    if (req.body.twitter) {
        profileField.social.twitter = req.body.twitter;
    }
    if (req.body.instagram) {
        profileField.social.instagram = req.body.instagram;
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
        // Check for profile
        if (profile) {
            // Update
            Profile
                .findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileField },
                    { new: true }
                )
                .then(profile => res.json(profile))
                .catch(err => res.status(500).json(err));
        } else {
            // Create
            // Save Profile
            new Profile(profileField)
                .save()
                .then(profile => res.status(201).json(profile))
                .catch(err => res.status(500).json(err));
        }
    });
});

// @route   GET api/profiles
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (profile) {
                res.json(profile);
            } else {
                return res.status(404).json({ profile: 'Not Found' });
            }
        })
        .catch(err => res.status(500).json(err));
});

// @route   GET api/profiles/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                res.status(404).json({ profile: 'Not Found' });
            } else {
                res.json(profile);
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
