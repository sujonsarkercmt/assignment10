const mongoose = require('mongoose');

const connectToDatabase = async () => {

    // cutomer schema 
    let loginsch = new mongoose.Schema({  //user state varibale 
        displayName: String,
        photoURL: String,
        accessToken: String, //accessToken
        email: String,
        password: String,
        cartData: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'addToCart'
        }]
    },{ strictPopulate: false });

    let login = mongoose.model('login', loginsch);
    global.login = login



    let addToCartSch = new mongoose.Schema({  //cart
        productname: String,
        selectBrand: String,
        price: String, 
        carType: String,  
    });
    let addToCart = mongoose.model('addToCart', addToCartSch);
    global.addToCart = addToCart


    let productSch = new mongoose.Schema({  //user state varibale 
        productname: String,
        selectBrand: String,
        price: String,
        shortDesc: String,
        fulldes: String,
        carType: String,
        selectedRating: String,
        imageBase64: String,
    });
    let product = mongoose.model('product', productSch);
    global.product = product



}

module.exports = {
    connectToDatabase,
};