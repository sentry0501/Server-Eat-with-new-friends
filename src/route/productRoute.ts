import express, { Router } from 'express';
import accountController from '../controller/accountController';
import productController from '../controller/productController';
import authProductMiddleware from '../middleware/authProductMiddleware';
import uploadImgController from '../controller/uploadImgController';
import upload from '../_base/file/upload';

const router: Router = express.Router();

router.post('/v1/product/getbyid',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authProductMiddleware("getById"),
  productController.getById
)

router.post('/v1/product/getbyrestaurantid',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authProductMiddleware("getByRestaurantId"),
  productController.getByRestaurantId
)

router.get('/v1/product',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authProductMiddleware("getAll"),
  productController.getAll
)

router.put('/v1/product/createone',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authProductMiddleware("create"),
  productController.createOne
)

router.delete('/v1/product/delete',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authProductMiddleware("delete"),
  productController.delete
)

router.put('/v1/product/update',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authProductMiddleware("update"),
  productController.updateInfo
)
router.put('/v1/product/updateprev',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authProductMiddleware("update"),
  upload.single("preview"),
  uploadImgController.uploadImg,
  productController.updatePreview
)


export default router;