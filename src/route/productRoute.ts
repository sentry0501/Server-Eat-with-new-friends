import express, { Router } from 'express';
import accountController from '../controller/accountController';
import productController from '../controller/productController';
import authProductMiddleware from '../middleware/authProductMiddleware';

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

router.post('/v1/product/getbyid',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authProductMiddleware("getById"),
  productController.getById
)

router.get('/v1/product',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authProductMiddleware("getAll"),
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
  uploadDisk.single("preview"),
  productController.updatePreview
)


export default router;