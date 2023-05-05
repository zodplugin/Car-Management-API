const router = require('express').Router();

const userController = require('../controller/userController');

router.get('/', userController.getUsers)
router.post('/login', userController.login)
router.post('/register', userController.createUser)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)

module.exports = router