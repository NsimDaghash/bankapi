const userModel = require('./user.model').userModel;

//Users Functions
    //Add new use
const addUser = ({ passportID, name, cash, credit, isActive }) => {
    const usersList = getUsersFromJSON();
    const duplicateCheck = usersList.find(user => user.passportID === passportID);
    if(duplicateCheck) { //if user already exists, return false, which means operation didn't happen
        return null;
    }
    else { //continue add operation
        const newUser = {
            passportID: passportID,
            name: name,
            cash: parseInt(cash),
            credit: parseInt(credit),
            isActive: isActive
        }
        user.save((err, data) => {
            if (err) return res.status(400).json(err.message);
            return res.status(200).json(data);
        })
        return newUser; //return user created
    }
}

    //Get specific user
const getSpecificUser = (req, res) => {
    const { id } = req.params;
    userModel.findById(id, (err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({message: 'User does not exist!'});
        return res.status(200).json(data);
    })
}

    //Get all users
const getUsers = (req, res) => {
    try {
        userModel.find({}, (err, data) => {
            if (err) return res.status(404).json(err);
            return res.status(200).json(data);
        })
    }
    catch (e) {
        return []
    }
}

    //Update user credit
const updateUserCredit = (passportID, creditAmountToUpdate) => {
    const wanted = passportID.params;
    console.log('passportID',passportID);
    const wantedUser = { name, passportID, cash, credit, isActive }
    if(wantedUser && creditAmountToUpdate >= 0){ //if user exists, and credit amount is positive
        userModel.findByIdAndUpdate(wanted, updatedUser, (err, data) => {
            if (err) return res.status(404).json(err.message);
            return res.status(201).json(data);
        })
        return true; //true means, user found and value updated
    }
    else { //doesn't exist, return false;
        return false;
    }
}

//Transactions Functions
    //Get all 
    /*
const getAllTransactionsFromJSON =  (req, res) => {
    try {
        const fileBuffer = fs.readFileSync('transactions.json')
        const data = fileBuffer.toString();
        return JSON.parse(data);
    }
    catch (e) {
        return []
    }
}
*/
/*
 
*/
    //Add new transaction
const addTransaction = ({transactionType, amount, receiver, sender}) => {
    amount = parseInt(amount);
    if(amount <= 0)
        return false;

    if(transactionType === 'withdrawal') {
        const { id } = req.params;
        const { amount } = req.body;
    
        userModel.findById(id, (err, user) => {
            if (err) return res.status(404).json(err.message);
            if(user.cash + user.credit - parseInt(amount) >= 0)
            userModel.findByIdAndUpdate(id, { cash: (user.cash - parseInt(amount)) }, { new: true, runValidators: true }, (err, data) => {
                if (err) return res.status(404).json(err.message);
                return res.status(200).json(data);
            })
            else return res.status(401).json({message: "User doesn't have enough cash"})
        })
    }
    else {
        if(transactionType === 'transferBetweenAccounts') {
    const { from, to } = req.params;
    const { amount } = req.body;

    userModel.findById(from, (err, user1) => {
        if (err) return res.status(404).json(err.message);
        if(user1.cash + user1.credit - parseInt(amount) >= 0)
        userModel.findByIdAndUpdate(from, { cash: (user1.cash - parseInt(amount)) }, { new: true, runValidators: true }, (err, user1Updated) => {
            if (err) return res.status(404).json(err.message);
            userModel.findById(to, (err, user2) => {
                if (err) return res.status(404).json(err.message);
                userModel.findByIdAndUpdate(to, { cash: (user2.cash + parseInt(amount)) }, { new: true, runValidators: true }, (err, user2Updated) => {
                    if (err) return res.status(404).json(err.message);
                    return res.status(200).json({user1: user1Updated, user2: user2Updated});
                })
            })
        })
        else return res.status(401).json({message: "Sender doesn't have enough cash"});
    })
        }
        else { // type = deposit
            const { id } = req.params;
            const { amount } = req.body;
        
            userModel.findById(id, (err, user) => {
                if (err) return res.status(404).json(err.message);
                userModel.findByIdAndUpdate(id, { cash: (user.cash + parseInt(amount)) }, { new: true, runValidators: true }, (err, data) => {
                    if (err) return res.status(404).json(err.message);
                    return res.status(200).json(data);
                })
            })
        }
    }

    return false;
}
module.exports = {
    /* the user functions */
    addUser,
    getUsers,
    getSpecificUser,
    updateUserCredit,
    addTransaction
    
    /* the transactions functions  */
   /* getAllTransactionsFromJSON,*/
    
}