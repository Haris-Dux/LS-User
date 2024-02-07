import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    accountTitle: {
        type: String,
        required: [true, 'Account Title is Required'],
    },
    accountNumber: {
        type: String,
        required: [true, 'Account number is Required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment Method is Required'],
        enum: ['Jazz Cash', 'Easy Paisa'],
    },
    backupAccount:{
        type : Boolean ,
        default : false
    },
    backupAccountCounter:{
        type : Number,
        default : 0
    },
    limit: {
        type: Number,
        required: [true, 'limit value is Required'],
    },
    usedLimit:{
        type : Number,
        default:0,
        validate:{
            validator : function (value) {
                return value <= this.limit;
            },
            msg:'Account limit Full'
        }
    }
},{ timestamps: true });

export const Accounts = mongoose.model("Accounts", accountSchema);
