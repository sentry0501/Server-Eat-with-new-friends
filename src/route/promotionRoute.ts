import express, { Router } from 'express';
import accountController from '../controller/accountController';
import promotionController from '../controller/promotionController';
import authPromotionMiddleware from '../middleware/authPromotionMiddleware';

import uploadDisk from '../_base/file/uploadDisk';
import uploadImgController from '../controller/uploadImgController';
import upload from '../_base/file/upload';


const router: Router = express.Router();

router.post('/v1/promotion/getbyid',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authPromotionMiddleware("getById"),
  promotionController.getById
)

router.post('/v1/promotion/getbyrestaurantid',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authPromotionMiddleware("getByRestaurantId"),
  promotionController.getByRestaurantId
)


router.put('/v1/promotion/createone',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authPromotionMiddleware("create"),
  promotionController.createOne
)

router.delete('/v1/promotion/delete',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authPromotionMiddleware("delete"),
  promotionController.delete
)

router.put('/v1/promotion/update',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authPromotionMiddleware("update"),
  promotionController.updateInfo
)
router.put('/v1/promotion/updateprev',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authPromotionMiddleware("update"),
  upload.single("preview"),
  uploadImgController.uploadImg,
  promotionController.updatePreview
)


export default router;