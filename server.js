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
        res.send(JSON.parse(data));
    }
    catch(err) {
        res.send({status: 'notFound'});
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
        res.send({status: 'Not found'});
    } else {
        res.send(user[0]);
    }
});

app.put('/update/:id', (req,res) => {
    const id = req.params.id;
    const data = fs.readFileSync("users.json");
    const users = JSON.parse(data);
    const user = users.filter((user) => {
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
    if(user.length === 0) {
        res.send({status: 'Not Found'});
    } else {
        const updatedUsers = JSON.stringify(users);
        fs.writeFile('users.json', updatedUsers, err => {
            if(err) throw err;
            else res.send({"updated": true});
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
            else res.send({data : 'added'});
        });
    } else {
        res.send({status: 'Already exist'});
    }
    
});

app.post('/signUp', (req, res) => {
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
            else res.send({token : generateUniqueId()});
        });
    } else {
        res.send({status: 'Already exist'});
    }
    
});

app.post('/login', (req,res) => {
    const data = fs.readFileSync('users.json');
    const users = JSON.parse(data);
    const user = users.filter((user) => {
        return user.email_id === req.body.email_id && user.password === req.body.password;
    });
    if(user.length === 0) {
        res.send({status: 'Not found'});
    } else {
        res.send({ "token" : generateUniqueId() }); 
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
            else res.send({ 'deleted': true });
        }); 
    } else {
        res.send({status : 'Not Found'});
    }
      
});

app.listen(8080, () => {
    console.log("Listening in port 8080");
});