const express = require('express');
const router = express.Router();

/**route sauce
*   /api/sauces = POST
*   /api/sauces/:id = PUT
*   /api/sauces/:id = DELETE
*   /api/sauces/:id/like = POST
*   /api/sauces = GET
*   /api/sauces/:id = GET
*   
**/

const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/like');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//on integre l'authentification pour securiser les routes stuff
router.post('/',auth,multer, sauceCtrl.createSauce);
router.get('/:id',auth, sauceCtrl.getOneSauce);
router.put('/:id',auth,multer, sauceCtrl.modifySauce);
router.delete('/:id',auth, sauceCtrl.deleteSauce);
router.post('/:id/like',auth,likeCtrl.userChoose);
router.get('/',auth, sauceCtrl.getAllSauce);

module.exports = router;