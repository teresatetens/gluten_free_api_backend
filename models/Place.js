const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    place_name: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    address: {type: String, required: true},
    is_supermarket: {type: Boolean, required: true},
    is_restaurant: {type: Boolean, required: true},
    gluten: {type: Boolean, required: true},
    lactose: {type: Boolean, required: true},
    fructose: {type: Boolean, required: true},
    review: [{ type: Schema.Types.ObjectId, ref: 'Review'}],   
    google_place_id: {type: String}
});

// Export model.
const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;