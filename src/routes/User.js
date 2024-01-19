const {Router} = require('express')
const controller = require ('../controllers/userController')
const router = Router();

router.get('/', controller.getUsers)

module.exports = router