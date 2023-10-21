
//========================================================================================
//                                Import File
//========================================================================================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require('path')

const bcrypt = require('bcrypt');
const saltRounds = 10;
global.bcrypt = bcrypt;
global.saltRounds = saltRounds;


app.set('trust proxy', true);


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


const cors = require('cors');
const corsOrigins = JSON.parse(process.env.corsOrigins);
app.use(cors({ origin: corsOrigins, credentials: true }));


const cookieParser = require('cookie-parser');
app.use(cookieParser());



//========================================================================================
//                                Express File
//========================================================================================
app.use('/static', express.static('public'));
app.use('/images', express.static('images'));
app.use(express.urlencoded({
    limit: '150mb',
    extended: true
}));



//NOTE:Create .env file and put here mongoose server url
//Like that:: DATABASE=mongodb+srv://kay:RealPassword@cluster0.rrlbs.mongodb.net/databaseFolder
//========================================================================================
//                                database
//========================================================================================
mongoose.set('strictQuery', true);
let url = `mongodb+srv://sujon:rtfm4523@cluster0.46qj8uo.mongodb.net/xyz?retryWrites=true&w=majority`
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('MongoDB database connection successfully');
});




//========================================================================================
//                                 Data base schema
//========================================================================================

const profile = require('./database/customer');
profile.connectToDatabase();

const login = require('./database/login');
login.connectToDatabase();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

 

//========================================================================================
//                                 Route
//========================================================================================


const clientdataretrive = require('./routes/Cutomer/clientDataRereive');
app.use('/clientDataRetrive', clientdataretrive);

const product = require('./routes/Cutomer/product');
app.use('/product', product);


const loginr = require('./routes/Login/login');
app.use('/login', loginr);


  

 
//========================================================================================
//                                Server Start
//========================================================================================
server.listen(80, () => {
    console.log(`Server is running on port`, 80);
});

