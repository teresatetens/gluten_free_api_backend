const User = require('../models/User')
const Review = require('../models/Review')
const Place = require('../models/Place')
//const async = require('async');

exports.list_users = (req, res) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
}

exports.create_user = (req, res) => {
    const {first_name, last_name, email, username, password, gluten, lactose, fructose, review, watch_list} = req.body
        User.create({ first_name, last_name, email, username, password, gluten, lactose, fructose, review, watch_list })
            .then(data => res.json(data))
            .catch(err => console.error(err.message))
}
//find user and retrieve all review and place data using populate
//this populates only review, but not the place, it shows just the id of the place
exports.find_user = (req, res) => {
    const { id } = req.params
    User.findById(id)
        // .populate('review')
        .populate('watch_list')
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
}

//userRouter.get('/:id/watchlist', userController.find_user_watchlist)
// exports.find_user_watchlist = (req, res) => {
//     const { id } = req.params
//     User.findById(id)
//         .populate('place')
//         .then(data => res.json(data))
//         .catch(err => console.error(err.message))
// }

//userRouter.put('/watchlist', userController.update_user_watchlist)
exports.update_user_watchlist = async (req, res) => {
    const { user, selected } = req.body

    let targetPlace = await Place.findOne({google_place_id: selected.place_id })

    if (!targetPlace) {
        targetPlace = new Place({
            "review": [],
            "place_name": selected.name,
            "lat": selected.geometry.location.lat,
            "lng": selected.geometry.location.lng,
            "address": selected.vicinity,
            "is_supermarket": false,
            "is_restaurant": true,
            "gluten": true,
            "lactose": false,
            "fructose": false,
            "google_place_id": selected.place_id
          })
         await targetPlace.save({targetPlace})
    }

    const updatedUser = await User.findByIdAndUpdate(user, { $push: { watch_list: targetPlace._id }}, { new: true }).populate('watch_list')
    res.status(200).send(updatedUser)
}

exports.delete_user_watchlist = async (req, res) => {
    const { user, google_place_id } = req.body

    let targetPlace = await Place.findOne({ google_place_id })

    const updatedUser = await User.findByIdAndUpdate(user, { $pull: { watch_list: targetPlace._id }}, { new: true }).populate('watch_list')
    res.status(200).send(updatedUser)
}

exports.update_user_review = (req, res) => {
    const { id, review_id } = req.body
    User.findByIdAndUpdate(id,{ $push: { review: review_id }})
        .then(data => res.json(data))
        .catch(err => console.error(err.message))
}

// exports.find_user = function(req, res, next) {

//     async.parallel({
//         user: function(callback) {
//             Book.findById(req.params.id)
//             .populate('review')
//             .populate('place')
//             .exec(callback);
//         },
//         review: function(callback) {
//             Review.find({ 'user': req.params.id })
//                 .exec(callback);
//         },
//         watch_list: function(callback) {
//             Place.find({ 'user': req.params.id })
//             .exec(callback);
//         },
//     }, function(err, results) {
//         if (err) { return next(err); }
//         if (results.user==null) { // No results.
//             var err = new Error('User not found');
//             err.status = 404;
//             return next(err);
//         }
//         // Successful, so render.
//         res.render('user_detail');
//     });

// };



//userRouter.delete('/:id', userController.delete_user)
exports.delete_user = (req, res) => {
    const { id } = req.params
    User.deleteOne({ _id: id })
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
  }

  //userRouter.delete('/all', userController.delete_users)
exports.delete_users = (req, res) => {
    const { condition, value } = req.body
    User.deleteMany({[condition]: value})
      .then(data => res.json(data))
      .catch(err => console.error(err.message))
}



