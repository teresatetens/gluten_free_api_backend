const Review = require('../models/Review')
const User = require('../models/User')
const Place = require('../models/Place')

exports.list_reviews = (req, res) => {
    Review.find()
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
}

exports.create_review = (req, res) => {
    const {text, rating, date, user_id, place_id} = req.body
        Review.create({text, rating, date, user_id, place_id })
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
}

exports.find_review = (req, res) => {
    const { id } = req.params
    Review.findById(id)
            .populate('place_id')
            .populate('user_id')
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }
