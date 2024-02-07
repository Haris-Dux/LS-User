import mongoose from "mongoose";

const schema = new mongoose.Schema({
  betAmount: {
    type: Number,
    required: [true, "Please provide Bet Amount"],
    enum: [100, 200, 500],
  },
  betNumber: {
    type: Number,
    required: [true, "Please provide Bet Number"],
  },
  name: {
    type: String,
    required: [true, "Please provide Name"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Please provide Mobile Number"],
  },
  prizeAcntInfo: {
    acntTitle: {
      type: String,
      required: [true, "Account Title is Required"],
    },
    acntNumber: {
      type: String,
      required: [true, "Account number is Required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is Required"],
      enum: ["Jazz Cash", "Easy Paisa", "Nayapay", "Sadapay"],
    },
  },
  image: {
    public_id: { type: String },
    secure_url: { type: String },
  },
  accountUsed: {
    Id: {
      type: mongoose.Types.ObjectId,
      required: [true, "Account Id Required"],
    },
    number: {
      type: String,
      required: [true, "Select One Account On which you are Making Payment"],
    },
  },
  isBetWinner:{
    type : Boolean ,
    default : false,
  },
  published: { type: Boolean , default: false}
},{ timestamps: true });

export const Bets = mongoose.model("Bets", schema);
