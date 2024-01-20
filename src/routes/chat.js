const {Router} = require('express')
const controller = require ('../controllers/chat')
const router = Router();

router.post('/',controller.sendMessages)
router.get('/',controller.getChatMessages)

router.post('/groups',controller.createGroup)
router.get('/groups',controller.getGroupsForUser)
router.post('/groups/:groupId/members', controller.addMember)
module.exports = router