const router = require('express').Router();

const shopController = require('../controller/shopController');
const checkRole = require('../middleware/checkRole')
router.get('/',checkRole('admin'), shopController.getShops)
router.get('/search',checkRole('admin'), shopController.searchShops)
router.get('/:id',checkRole('admin'), shopController.getShopById)
router.put('/:id',checkRole('superadmin'), shopController.editShop)
router.delete('/:id',checkRole('superadmin'), shopController.deleteShop)
router.post('/',checkRole('superadmin'), shopController.createShop)

module.exports = router