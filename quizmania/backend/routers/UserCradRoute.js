module.exports = (app) => {

    const userAuth = require('../databaseModel/userAuth');
    const bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');
    const auth = require('../MiddleWare/authMiddleWare')
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
    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            //validate
            if (!email || !password)
                res.status(400).json({ msg: "Enter all Field" });
            const userPresent = await userAuth.findOne({ email: email });
            if (!userPresent)
                return res.status(400).json({ msg: 'No account find from this email id' });
            else
                console.log("present")
            // password ValidityState
            const isPassCorrect = await bcrypt.compare(password, userPresent.password);
            if (!isPassCorrect)
                return res.status(400).json({ msg: 'Invalid Credentials' });
            const token = jwt.sign({ id: userPresent._id }, "fdfjnjbm");
            res.json({
                token,
                userPresent: {
                    id: userPresent._id,
                    displayName: userPresent.displayName,
                },
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    app.delete("/delete", auth, async (req, res) => {
        try {
            const deletedUser = await userAuth.findByIdAndDelete(req.user);
            res.json(deletedUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.post("/tokenIsValid", async (req, res) => {
        try {
            const token = req.header("x-auth-token");
            if (!token) return res.json(false);

            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (!verified) return res.json(false);

            const user = await userAuth.findById(verified.id);
            if (!user) return res.json(false);

            return res.json(true);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    app.get("/", auth, async (req, res) => {
        const user = await userAuth.findById(req.user);
        res.json({
            displayName: user.displayName,
            id: user._id,
        });
    });
}