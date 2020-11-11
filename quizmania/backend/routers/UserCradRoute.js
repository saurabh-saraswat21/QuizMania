module.exports = (app) => {

    const userAuth = require('../databaseModel/userAuth');
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());

    app.post('/adduser', (req, res) => {
        const newUser = new userAuth({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

        newUser.save()
            .then(() => res.json('user added'))
            .catch((err) => console.log(err));
    })
}