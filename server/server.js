const port = 5000;

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', require('./routes/bankusers.route'));

mongoose.connect('mongodb+srv://users:2175nwsh@cluster0.v4d9p.mongodb.net/users?retryWrites=true&w=majority',{ useNewUrlParser: true });

// app.listen('mongodb+srv://users:2175nwsh@cluster0.v4d9p.mongodb.net/users?retryWrites=true&w=majority'|| 5001 () => {
//     console.log('Server started on port 5001');

//    mongoose.connect('mongodb+srv://nasimdaghash:nwsh2175@cluster0.ipbr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true });

    app.listen(process.env.PORT || 5001, () => {
        console.log('Server started on port 5001');
});

//Users Requests

    //Request responds with array of users, could be empty.
app.get('/users',(req,res)=>{
    res.status(200).json(usersUtils.getUsersFromJSON());
})

    //Get specific user
app.get('/users/:passportID',(req,res)=>{
    const fsFunctionResponse = usersUtils.getSpecificUser(req.params.passportID);
    if(fsFunctionResponse) {
        res.status(200).json(fsFunctionResponse);
    }
    else
        res.status(404).json('User does not exist');
})

    //Add user
app.post('/users', (req, res) =>{
    const fsFunctionResponse = usersUtils.addUser(req.body);
    if(fsFunctionResponse) {
        res.status(201).json(fsFunctionResponse);
    }
    else
        res.status(222).json('User already exists');
})

    //Update user credit
app.post('/updateCredit/:passportID', (req, res) =>{
    const fsFunctionResponse = usersUtils.updateUserCredit(req.params.passportID, req.body.credit);
    if(fsFunctionResponse) {
        res.status(201).json('User credit updated succesfully');
    }
    else
        res.status(222).json('User credit update failed');
})

//Transactions Requests

    //Get transactions
app.get('/transactions',(req,res)=>{
    res.status(200).json(usersUtils.getAllTransactionsFromJSON());
})

    //Add transaction
app.post('/transactions',(req,res)=>{
    const fsFunctionResponse = usersUtils.addTransaction(req.body);
    if(fsFunctionResponse) {
        res.status(201).json(fsFunctionResponse);
    }
    else
        res.status(222).json('Error in processing transaction');
})

app.listen(port, ()=> console.log(`Listening to port ${port}`))