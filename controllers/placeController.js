const Place = require('../models/Place')
const User = require('../models/User')
const Review = require('../models/Review')


exports.list_places = (req, res) => {
    Place.find()
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
}

exports.find_place = (req, res) => {
    const { id } = req.params
    Place.findById(id).populate('review')
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

exports.create_place = (req, res) => {
    const {place_name, lat, lng, address, is_supermarket, is_restaurant, gluten, lactose, fructose, review, google_place_id} = req.body
        Place.create({ place_name, lat, lng, address, is_supermarket, is_restaurant, gluten, lactose, fructose, review, google_place_id })
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
}

//push reviews
exports.update_place = (req, res) => {
    const { id, review_id } = req.body
    Place.findByIdAndUpdate(id,{ $push: { review: review_id }})
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
}
// {
//     "id": "5fc66362631263b73c144a00", 
//     "review_id": "5fc67310acbdbe59bc3415af"
//     }
