module.exports = (app) => {

    const userAuth = require('../databaseModel/userAuth');
    const bodyParser = require('body-parser');
    const bcrypt = require('bcryptjs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    // sign up route
    app.post('/register', async (req, res) => {
        try {
            let { firstName, lastName, email, password, password2 } = req.body;

            // validation
            if (!email || !password || !firstName || !lastName || !password2)
                return res.status(400).json({ msg: "Enter all Field" });
            if (password.lenght < 5)
                return res.status(400).json({ msg: "password is to short" });
            if (password !== password2)
                return res.status(400).json({ msg: "password doen't match" });

            const exitingUser = await userAuth.findOne({ email: email })
            if (exitingUser)
                return res.status(400).json({ msg: "user already exist with this email ID" });

            //password hashing

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            console.log(passwordHash);

            const newUser = new userAuth({
                firstName,
                lastName,
                email,
                password
            });
            newUser.save()
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }

    })

    //login route
    app.post('/login', async (res, req) => {
        try {
            const { email, password } = req.body;
            //validate
            if (!email || !password)
                res.status(400).json({ msg: "Enter all Field" });
            const userPresent = await userAuth.findOne({ email: email });
            if (!userPresent)
                return res.status(400).json({ msg: 'No account find from this email id' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
}