const express = require('express');
const usersUtils =require('../usersUtils')
//const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', (req, res) => { //GetAllUsers
    usersUtils.getUsers(req, res);
}).get('/id=:id', (req, res) => { //GetSpecificUser
    usersUtils.getSpecificUser(req, res);
}).post('/', (req, res) => { //CreateNewUser
    usersUtils.addUser(req, res);
}).put('/id=:id', (req, res) => { //Update whole user
    usersUtils.updateUserCredit(req, res);
}).post('/deposit/id=:id', (req, res) => { //deposit
    usersUtils.addTransaction(req, res);
})
module.exports = router;