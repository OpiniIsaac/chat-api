const {Router} = require('express')
const controller = require ('../controllers/Benefit.js')
const router = Router();

router.get('/', controller.getBenefits)
router.get('/:id', controller.getSingleBenefit)
router.post('/',controller.addBenefit)
router.put('/:id', controller.updateBenefit)

module.exports = router