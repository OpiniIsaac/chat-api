const {Router} = require('express')
const controller = require ('../controllers/chat')
const router = Router();

router.post('/',controller.sendMessages)
router.get('/',controller.getChatMessages)
router.get('/group/:id',controller.getChatMessagesForUserOrGroup)
router.post('/groups',controller.createGroup)
router.get('/groups/:id',controller.getGroupsForUser)
router.post('/groups/:groupId/members', controller.addMember)


router.get('/messages/:id', controller.getChatMessagesForUserOrGroup)
router.get("/test/group/:id", controller.getGroupById)
module.exports = router