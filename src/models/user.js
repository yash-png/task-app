//Mongoosemodel = just like creating a table in sql.
// user model start -
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const sharp = require('sharp');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Anonymous',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be greater than zero');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'Owner'
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
};
userSchema.methods.generateAuthTokens = async function() { //why not arrow?
    const user = this;
    // console.log(user);
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    console.log(token);
    user.tokens = user.tokens.concat({ token });
    console.log(user.tokens);
    await user.save();

    return token;
};


userSchema.statics.findByCredentials = async(email, password) => {
    // console.log("hello");
    const user = await User.findOne({ email });
    // res.send(user);
    // console.log(user);
    // console.log(user.password);

    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};
userSchema.pre('save', async function(next) {
    const user = this;
    // console.log(user);
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        // console.log(user.password);
    }
    next();
});
userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next();
});


//it save the object in db.

// user model closed
const User = mongoose.model('User', userSchema);


module.exports = User;