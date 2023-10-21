const express = require('express')
const routes = express.Router();
const multer = require('multer');
let upload = multer({}).none()
let loginCheck = require('./loginCheck');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken')
const saltRounds = 10;
var XLSX = require('xlsx');

//--------------login by google ---------------------------
routes
    .route('/login')
    .post(async (req, res) => {
        upload(req, res, async function (err) { 
            let user = await login.findOne({ email: req.body.email, accessToken: req.body.accessToken })
            if (!user) {
                let userdata = new login({
                    displayName: req.body.displayName,
                    photoURL: req.body.photoURL,
                    accessToken: req.body.accessToken, //accessToken
                    email: req.body.email,
                })
                await userdata.save()
                res.json({ data: 'login success', userdata })
            } else {
                let userdata = await login.findOne({ email: req.body.email })
                if (userdata) {
                    res.json({ data: 'login success', userdata })
                } else {
                    res.json({ data: 'login error' })
                }
            }
        })
    });



//--------------login manual ---------------------------
routes
    .route('/login')
    .post(async (req, res) => {
        upload(req, res, async function (err) {

            let userdata = await login.findOne({ email: req.body.email, password: req.body.password })
            if (!userdata) {
                res.json({ data: 'login success', userdata })
            } else {
                res.json({ data: 'User Name or password wrong' })
            }
        })
    });

//--------------register---------------------------
routes
    .route('/register')
    .post(async (req, res) => {
        upload(req, res, async function (err) {

            let user = await login.findOne({ email: req.body.email })
            if (!user) {
                let userdata = new login({
                    displayName: req.body.displayName,
                    photoURL: req.body.photoURL[0],
                    password: req.body.password, //accessToken
                    email: req.body.email,
                })
                await userdata.save()
                res.json({ data: 'User Created', userdata })
            } else {
                res.json({ data: 'User Already exist' })
            }
        })
    });



module.exports = routes;


