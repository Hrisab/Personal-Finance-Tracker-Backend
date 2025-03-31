import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

//can add a preference for currency or budget cycle dates
//googleID as a schema

const UserSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: [true,"email is required"],
        unique: true,
    },
    password:{
        type: String,
        required:[true,"password is required"],
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    color: {
        type: Number,
        required: false
    },
    profileSetup: {
        type: Boolean,
        required: false,
        default: false
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;