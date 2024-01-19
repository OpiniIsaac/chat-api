const {Router} = require('express')
const controller = require ('../controllers/Benefit.js')
const router = Router();

router.get('/', controller.getUsers)
router.get('/:id', controller.getSingleUser)
router.post('/',controller.addUser)
router.put('/:id', controller.updateUser)

module.exports = router