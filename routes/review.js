const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/reviewController')

reviewRouter.get('/', reviewController.list_reviews)
reviewRouter.get('/:id', reviewController.find_review)
reviewRouter.post('/', reviewController.create_review)
//reviewRouter.put('/', reviewController.update_review)
//reviewRouter.delete('/all', reviewController.delete_reviews)
//reviewRouter.delete('/:id', reviewController.delete_review)

module.exports = reviewRouter;