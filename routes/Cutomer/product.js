const express = require('express')
const routes = express.Router();
const multer = require('multer');
let upload = multer({}).none()

routes
    .route('/addproduct')
    .post(async (req, res) => {
        upload(req, res, async function (err) {

            try {
                let newProduct = new product(req.body)
                await newProduct.save()
                res.json({ data: 'success' })
            } catch (error) {
                res.status(500)
            }

        })
    });



routes
    .route('/productRetrive')
    .post(async (req, res) => {
        upload(req, res, async function (err) {

            try {
                console.log(req.body.productname)
                let newProduct = await product.find({ selectBrand: req.body.productname })
                res.json({ data: 'success', newProduct })
            } catch (error) {
                res.status(500)
            }
        })
    });




routes
    .route('/addtocart')
    .post(async (req, res) => {
        upload(req, res, async function (err) {

            try {
                let finduser = await login.findOne({ email: req.body.username })


                if (!finduser) {
                    res.json({ data: 'usernot Found' })
                    return
                }


                let findProduct = await product.findById(req.body.itemId)

                let newCartData = new addToCart({
                    productname: findProduct.productname,
                    selectBrand: findProduct.selectBrand,
                    price: findProduct.price,
                    carType: findProduct.carType,
                })
                await newCartData.save()
                finduser.cartData.push(newCartData)
                await finduser.save()

                res.json({ data: 'success',newCartData })

            } catch (error) {
                console.log(error)
                res.status(500)
            }
        })
    });




routes
    .route('/cartData')
    .post(async (req, res) => {
        upload(req, res, async function (err) {

            try {
                let finduser = await login.findOne({ email: req.body.username })


                if (!finduser) {
                    res.json({ data: 'usernot Found' })
                    return
                }
                if (finduser.cartData) {
                    await finduser.populate('cartData')

                    res.json({ data: 'success', cartdata: finduser.cartData })

                } else {
                    res.json({ data: 'success', cartdata: [] })
                }


            } catch (error) {
                console.log(error)
                res.status(500)
            }
        })
    });



routes
    .route('/removeFromCart')
    .post(async (req, res) => {
        upload(req, res, async function (err) {

            try {
                let finduser = await login.findOne({ email: req.body.username });

                if (!finduser) {
                    res.json({ data: 'User not found' });
                    return;
                }
  
                await finduser.populate('cartData');
 
                finduser.cartData = finduser.cartData.filter(item => item._id.toString() !== req.body.cartId); 
                await finduser.save();

                await addToCart.findByIdAndDelete(req.body.cartId); 

   
                res.json({ data: 'success' });
            } catch (error) {
                // Handle any errors here
                console.error(error);
                res.status(500).json({ error: 'An error occurred' });
            }
        })
    });



module.exports = routes;

