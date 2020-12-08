const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    gluten: {type: Boolean, required: true},
    lactose: {type: Boolean, required: true},
    fructose: {type: Boolean, required: true},
    review: [{ type: Schema.Types.ObjectId, ref: 'Review'}],   
    watch_list: [{ type: Schema.Types.ObjectId, ref: 'Place'}]
});

// Export model.
const User  = mongoose.model('User', UserSchema);
module.exports = User
