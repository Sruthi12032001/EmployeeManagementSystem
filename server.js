const express = require('express');
const generateUniqueId = require('generate-unique-id'); 
const app = express();
const fs = require('fs');
app.use(express.json()); 
const cors = require('cors');
app.use(cors({ origin: '*' }));
let token;

app.get('/getAllUsers', (req, res) => {
    const data = fs.readFileSync("users.json");
    try{
        
        res.status(200).send(JSON.parse(data));
    }
    catch(err) {
        res.status(404).send('User Details Not Found');
    }
   
});

app.get('/getWithId/:id', (req, res) => {
    const id = req.params.id;
    const data = fs.readFileSync("users.json");
    const users = JSON.parse(data);
    const user = users.filter((user) => {
        return user.id === id.toString();
    });
    if(user.length === 0) {
        res.status(404).send('Not found');
    } else {
        res.status(200).send(user[0]);
    }
});

app.put('/update/:id', (req,res) => {
    const id = req.params.id;
    const data = fs.readFileSync("users.json");
    const users = JSON.parse(data);
    const userDetails = users.filter((user) => {
        if(user.id === id.toString()) {
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.age = req.body.age;
            user.email_id = req.body.email_id;
            user.password = req.body.password;
            user.employee_type = req.body.employee_type;
            user.address = req.body.address;
            user.pin_code = req.body.pin_code;
            return user;
        };
    }); 
    if(userDetails.length === 0) {
        res.status(404).send('Not Found');
    } else {
        const updatedUsers = JSON.stringify(users);
        fs.writeFile('users.json', updatedUsers, err => {
            res.status(200).send(userDetails);
        });
    }
    
    
})

app.post('/addUser', (req, res) => {
    console.log('yes');
    const data = fs.readFileSync('users.json');
    const users = JSON.parse(data);
    const found = users.filter((user) => {
        return user.email_id === req.body.email_id;
    });

    if(found.length === 0) {
        const user = {id: generateUniqueId(), ...req.body};
        users.push(user);
        const newUsers = JSON.stringify(users);
        fs.writeFile('users.json', newUsers, err => {
            if(err) throw err;
            else res.status(200).send(found);
        });
    } else {
        res.status(404).send('Email Already Exist');
    }
    
});

app.post('/signUp', (req, res) => {
    const data = fs.readFileSync('users.json');
    const users = JSON.parse(data);
    const found = users.filter((user) => {
        return user.email_id === req.body.email_id;
    });

    if(found.length === 0) {
        console.log('yes');
        const user = {id: generateUniqueId(), ...req.body};
        users.push(user);
        const newUsers = JSON.stringify(users);
        fs.writeFile('users.json', newUsers, err => {
            res.status(200).send({token : generateUniqueId()});
        });
    } else {
        res.status(404).send('Email Already Exist');
    }
    
});

app.post('/login', (req,res) => {
    const data = fs.readFileSync('users.json');
    const users = JSON.parse(data);
    const user = users.filter((user) => {
        return user.email_id === req.body.email_id && user.password === req.body.password;
    });
    if(user.length === 0) {
        res.status(404).send('Enter valid details');
    } else {
        res.status(200).send({ "token" : generateUniqueId() }); 
    }
   
});


app.delete('/delete/:id', (req, res) => {
    const data = fs.readFileSync('users.json');
    const users = JSON.parse(data);
    const id = req.params.id;
    const usersWithoutIdGiven = users.filter((user) => {
        return user.id != id.toString();
    });

    if(usersWithoutIdGiven.length < users.length) {
        const newUsers = JSON.stringify(usersWithoutIdGiven);
        fs.writeFile('users.json', newUsers, err => {
            if(err) throw err;
            else res.status(200).send(usersWithoutIdGiven);
        }); 
    } else {
        res.status(404).send('User not found');
    }
      
});

app.listen(8080, () => {
    console.log("Listening in port 8080");
});