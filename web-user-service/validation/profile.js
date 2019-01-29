const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.familyName = isEmpty(data.familyName) ? '' : data.familyName;
    data.lastName = isEmpty(data.lastName) ? '' : data.lastName;
    data.birthday = isEmpty(data.birthday) ? '' : data.birthday;

    if (Validator.isEmpty(data.familyName)) {
        errors.familyName = 'Family name is required';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required';
    }

    if (Validator.isEmpty(data.birthday)) {
        errors.birthday = 'Birthday is required';
    }

    if (!isEmpty(data.telephoneNumber)) {
        if (!Validator.isMobilePhone(data.telephoneNumber, 'en-US')) {
            errors.telephoneNumber = 'Not a valid telephone number';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL'; 
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}