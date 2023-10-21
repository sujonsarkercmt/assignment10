const mongoose = require('mongoose');

const connectToDatabase = async () => {

    // customer schema 
    let customerSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        gender: String,
        dateOfBirth: Date,
        address: String,
        divisions: String,
        district: String,
        upazilas: String,
        CreatedAt: { type: Date, default: Date.now },
        extraUserData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CustomerExtraData'
        }
    });

    let Customer = mongoose.model('Customer', customerSchema);
    global.Customer = Customer


    //!================user extra data
    let userExtraDataSchema = new mongoose.Schema({
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        Messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messaage'
        }],
        CreatedAt: { type: Date, default: Date.now },
        userImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userProfilePic'
        }
    });

    let userExtraData = mongoose.model('CustomerExtraData', userExtraDataSchema);
    global.userExtraData = userExtraData


    //!=================user image
    let user_Profile_Pic_Sch = new mongoose.Schema({
        extraUserDataAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CustomerExtraData'
        },
        CreatedAt: { type: Date, default: Date.now },
        user_Profile_Pic: String,
    });

    let user_Profile_Pic = mongoose.model('userProfilePic', user_Profile_Pic_Sch);
    global.user_Profile_Pic = user_Profile_Pic


    //!==================== user message saved
    let MessaageSchema = new mongoose.Schema({
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        extraUserDataAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CustomerExtraData'
        },
        Message: String,
        CreatedAt: { type: Date, default: Date.now },
    });

    let Messaage = mongoose.model('Messaage', MessaageSchema);
    global.Messaage = Messaage




    //!==================== user event
    let MessageSchedulerSch = new mongoose.Schema({
        message: String,
        date: Date,
        eventSetBy: String,
    });

    let MessageScheduler = mongoose.model('MessageScheduler', MessageSchedulerSch);
    global.MessageScheduler = MessageScheduler


    //!==================== user fixed event
    let fixedEventSch = new mongoose.Schema({
        message: String,
        category: String,
    });

    let fixedEvent = mongoose.model('fixedEvent', fixedEventSch);
    global.fixedEvent = fixedEvent

}

module.exports = {
    connectToDatabase,
};