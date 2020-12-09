const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController')

userRouter.get('/', userController.list_users)
userRouter.get('/:id', userController.find_user)
// userRouter.get('/:id/watchlist', userController.find_user_watchlist)
userRouter.post('/', userController.create_user)
userRouter.put('/watchlist', userController.update_user_watchlist)
userRouter.delete('/watchlist', userController.delete_user_watchlist)
userRouter.put('/review', userController.update_user_review)
//userRouter.delete('/all', userController.delete_users)
//userRouter.delete('/:id', userController.delete_user)

module.exports = userRouter;