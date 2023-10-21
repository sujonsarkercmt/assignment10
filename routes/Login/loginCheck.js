
let jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function check_user_validity(req, res) {

    return new Promise((resolve, reject) => {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.jwt_key, async (err, data) => {
                if (err) { 
                    if (err.name == 'TokenExpiredError')
                        reject('TokenExpiredError');
                } else {

                    await login.findOne({ userID: data.username })
                        .then(e => {
                            if (e) {
                                bcrypt.compare(data.password, e.userPass, function (err, result) {
                                    if (err) {
                                        reject('userNotFond');
                                    } else {
                                        if (result === true) {
                                            resolve(e);

                                        } else {
                                            reject();
                                        }
                                    }
                                });
                            } else {
                                reject();
                            }
                        })
                        .catch(err => { 
                            reject('userNotFond');
                        });
                }
            }).catch(e => {
                console.log('cookie not valid')
                reject();
            })
        } else {
            reject('cookie_not_found');
        }
    });
}

module.exports = {
    check_user_validity: check_user_validity,
};