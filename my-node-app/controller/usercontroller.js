const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`, 'utf-8'));

exports.getAllUsers = (req, res) => {
    req.requestTime = new Date().toISOString();
    console.log(`Request time is ${req.requestTime}`);
    try {
        res.status(200).json({
            status: "success",
            results: users.length,
            time: req.requestTime,
            data: { users }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

exports.getSpecificUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(el => el.id === id);
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
            data: null
        });
    }
    res.json({
        status: 'success',
        data: user
    });
};

exports.postUser = (req, res) => {
    try {
        const userId = users.length ? users[users.length - 1].id + 1 : 1;
        const newUser = { id: userId, ...req.body };
        users.push(newUser);
        fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), (err) => {
            if (err) throw err;
            res.status(201).json({
                status: 'success',
                data: { user: newUser }
            });
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

exports.patchUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(el => el.id === id);
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
            data: null
        });
    }
    Object.assign(user, req.body);
    fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), (err) => {
        if (err) throw err;
        res.status(200).json({
            status: 'success',
            data: { user }
        });
    });
};

exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(el => el.id === id);
    if (userIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
            data: null
        });
    }
    users.splice(userIndex, 1);
    fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), (err) => {
        if (err) throw err;
        res.status(204).json({
            status: 'success',
            message: 'User deleted',
        });
    });
};
