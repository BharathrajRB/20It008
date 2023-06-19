const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post('/register',
    check("companyName", "companyname is required").notEmpty(),
    check("ownerName", "ownername is required").notEmpty(),
    check("rollNo", "Rollno is required").notEmpty(),
    check("ownerEmail", "owneremail is required").isEmail(),
    check("accessCode", "accesscode is required").notEmpty(),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ msg: error.array() });
        }


        const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;


        try {
            let user = await User.findOne({ rollNo });
            if (user) {
                return res.status(400).json({ msg: "This Rollno already exists" });
            }

            let firstuser = new User({
                companyName,
                ownerName,
                rollNo,
                ownerEmail,
                accessCode,
            });
            await firstuser.save();

            return res.json(firstuser);

        }
        catch (err) {
            res.status(500).json({ msg: "server error" });
        }

    });



router.get('/', (req, res) => {
    res.status(200).json({ msg: " Testing code" });
});