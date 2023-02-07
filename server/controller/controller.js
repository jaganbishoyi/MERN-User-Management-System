var UserDB = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.send(400).send({ message: "Content can not be empty!" });
        return;
    }

    // new user
    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });

    // save the user in the database
    user
        .save(user)
        .then(data => {
            // res.send(data);
            res.redirect('/');
        })
        .catch(err => {
            res.status(500, { message: err.message || 'Some error occurred while creating a create operation' });
        });
};

// retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        UserDB
            .findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: 'Not found user with the id' + id
                    });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving user with id" + id });
            });

    } else {
        UserDB.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retrieving user information" });
            });
    }
};

// update a new user bu user id
exports.update = (req, res) => {
    if (!req.body) {
        res.send(400).send({ message: "Data to update can not be empty!" });
        return;
    }
    const id = req.params.id;

    UserDB
        .findByIdAndUpdate(id, req.body, { userFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with ${id}. Maybe user not found!` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update user information" });
        });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    UserDB
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with ${id}. Maybe user is wrong!` });
            } else {
                res.send({ message: "User deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete user id with ${id}` });
        });
};