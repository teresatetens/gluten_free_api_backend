const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    text: {type: String, required: true},
    date: {type: Date, default: Date.now(), required: true},
    rating: {type: Number, required: true},
    place_id: { type: Schema.Types.ObjectId, ref: 'Place', required: true},
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});

// Export model.
const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;