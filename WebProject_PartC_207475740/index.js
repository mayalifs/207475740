const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const connection = require("./DB/db");
const createDB = require("./DB/createDB");
const CRUD = require('./DB/CRUD');
var cookieParser = require('cookie-parser');
const port = 3000; 

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser());


const showMenu = (req, res, next) => {
    req.loggedInUser = req.cookies.username;
    next();
};

app.use(showMenu);

app.get('/', (req, res) => {
    res.render('HomePage', { loggedInUser: req.loggedInUser });
})

app.get('/HomePage', (req, res) => {
    res.render('HomePage', { loggedInUser: req.loggedInUser });
})

app.get('/SignInPage', (req, res) => {
    res.render('SignInPage');
})

app.get('/SignUpPage', (req, res) => {
    res.render('SignUpPage');
})

app.get('/AddNewPlacePage', (req, res) => {
    res.render('AddNewPlacePage', { loggedInUser: req.loggedInUser });
})

app.get('/FindPlacePage', (req, res) => {
    res.render('FindPlacePage', { loggedInUser: req.loggedInUser });
})

app.get('/RatePage', (req, res) => {
    res.render('RatePage', { loggedInUser: req.loggedInUser });
})

app.get('/UserDetailsPage', (req, res) => {
    res.render('UserDetailsPage', { loggedInUser: req.loggedInUser });
})

app.get('/DeleteAccountPage', (req, res) => {
    res.clearCookie('username');
    res.render('DeleteAccountPage', { loggedInUser: req.loggedInUser });
})


app.get('/LogoutPage', (req, res) => {
    res.clearCookie('username');
    res.render('HomePage');
  });




app.listen(port, () => {
    console.log('server is running on port '+ port);
})



// CRUD
app.post('/signUp', showMenu, CRUD.createNewUser);
app.post('/addPlace', showMenu, CRUD.createNewPlace);
app.post('/rate', showMenu, CRUD.createNewRate);

app.get('/findUser', showMenu, CRUD.findUser);
app.get('/findPlace', showMenu, CRUD.findPlaceByCity);


app.post('/UserDetailsPage', showMenu, CRUD.updatePassword);
app.post('/DeleteAccountPage', showMenu, CRUD.deleteUser);


// createDB
// create tables
app.get('/createUsers',createDB.createUsers);
app.get('/createPlaces',createDB.createPlaces);
app.get('/createRates',createDB.createRates);

// show tables
app.get('/showAllUsers',createDB.showAllUsers);
app.get('/showAllPlaces',createDB.showAllPlaces);
app.get('/showAllRates',createDB.showAllRates);

// drop tables
app.get('/dropUsersTable',createDB.dropUsersTable);
app.get('/dropPlacesTable',createDB.dropPlacesTable);
app.get('/dropRatesTable',createDB.dropRatesTable);

// insert into tables
app.get('/insertIntoUsers',createDB.insertIntoUsers);
app.get('/insertIntoPlaces',createDB.insertIntoPlaces);
app.get('/insertIntoRates',createDB.insertIntoRates);

// create and drop all tables together
app.get('/createAllTables',createDB.createAllTables);
app.get('/dropAllTables',createDB.dropAllTables);
