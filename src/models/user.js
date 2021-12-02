const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    user: {
        type: String,
        required: true
    },
    email: { 
        type: String,  
        unique: true,
        index: true, 
        required: true },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.userId = _id;
    return object;
})

module.exports = model('User', UserSchema);