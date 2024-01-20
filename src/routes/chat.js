const {Router} = require('express')
const controller = require ('../controllers/chat')
const router = Router();

router.post('/',controller.sendMessages)

router.post('/groups',controller.createGroup)
router.post('/groups/:groupId/members', controller.addMember)
module.exports = router