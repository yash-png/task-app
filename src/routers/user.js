const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
router.post('/users', async(req, res) => {
    // console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthTokens();
        res.status(201).send({
            user,
            token
        });
    } catch (error) {
        res.status(400).send(error);
    }

});

// hash the plain text password before saving.
router.post('/users/login', async(req, res) => {
    console.log("hello ");
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthTokens();
        res.status(201).send({ user, token });
        // console.log(user, token);
    } catch (e) {
        res.status(400).send(e);

    }
});
router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }

});

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
    } catch (e) {
        res.status(500).send();
    }
});
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user);
});


// router.get('/users', auth, async(req, res) => {
//     // res.send(req.user);

//     try {
//         const user = await User.find({});
//         res.status(200).send(user);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }

// });

// router.get('/users/:id', async(req, res) => {
//     const _id = req.params.id;
// this route is removed coz we are getting response as our id. due to it, we don't have to specify it.
//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);

//     } catch (error) {
//         res.status(404).send();
//     }


// });

router.patch('/users/me', auth, async(req, res) => { //updating user     
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send('Error: Invalid updates!');
    }
    try {
        // const user = await User.findById(req.params.id);
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });
        await req.user.save();
        res.send(req.user);
        // if (!user) {
        //     res.status(404).send();
        // }

    } catch (e) {
        res.status(400).send();
    }
});
router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req, params.id);
        // if (!user) {
        //     return res.status(404).send();
        // }

        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
            return cb(new Error('Please upload the img file'));
        }
        cb(undefined, true);

        // cb(new Error("file must be in a pdf format"));
        // cb(undefined, true);
        // cb(undefined, false);

    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();



    // req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send("hello");
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});
router.delete('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send('delete successfully!');
});
router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await user.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error('Not found! Try again');
        }
        res.set('Content-type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});
module.exports = router;