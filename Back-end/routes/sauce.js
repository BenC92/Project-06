const express = require('express');
const router = express.Router();
const cors = require('cors')

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', cors(),  auth, sauceCtrl.getAllSauce);
router.post('/', sauceCtrl.createSauce);
router.get('/:id', cors(),auth, sauceCtrl.getOneSauce);
router.put('/:id', cors(),auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', cors(),auth, sauceCtrl.deleteSauce);

module.exports = router;