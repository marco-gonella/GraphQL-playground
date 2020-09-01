import mongoose, { Schema } from 'mongoose';

// INTERFACES
export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    active: boolean;
}

export interface IUserInputDTO {
    username: string;
    password: string;
    email: string;
}

// DB MODELS
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    active: Boolean
});

export const User = mongoose.model('User', userSchema);

// ADD Hooks
// userSchema.pre('save', (...args) => {
//     console.log('before save', args);
// });