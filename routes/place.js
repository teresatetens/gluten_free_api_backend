const express = require('express');
const placeRouter = express.Router();
const placeController = require('../controllers/placeController')

placeRouter.get('/', placeController.list_places)
placeRouter.get('/:id', placeController.find_place)
placeRouter.post('/', placeController.create_place)
placeRouter.put('/', placeController.update_place)
//placeRouter.delete('/all', placeController.delete_places)
//placeRouter.delete('/:id', placeController.delete_place)

module.exports = placeRouter;

