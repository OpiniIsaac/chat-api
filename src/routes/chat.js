const {Router} = require('express')
const controller = require ('../controllers/chat')
const router = Router();

// router.get('/', controller.getUsers)
// router.get('/:id', controller.getSingleUser)
router.post('/',controller.sendMessages)
//router.put('/:id', controller.updateUser)

module.exports = router