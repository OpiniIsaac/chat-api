const {Router} = require('express')
const controller = require ('../controllers/userController')
const router = Router();

router.get('/', controller.getUsers)
router.post('/',controller.addUser)

module.exports = router