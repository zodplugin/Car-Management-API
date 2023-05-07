const router = require('express').Router();

const userController = require('../controller/userController');

//middleware
const Authorization = require('../middleware/auth')
const checkRole = require('../middleware/checkRole');
router.get('/', userController.getUsers)
router.post('/login', userController.login)
router.post('/register', userController.createUser)
router.get('/:id',Authorization,checkRole('superadmin'), userController.getUserById)
router.put('/:id',Authorization,checkRole('superadmin'), userController.editUser)
router.delete('/:id',Authorization,checkRole('superadmin'), userController.deleteUser)

module.exports = router