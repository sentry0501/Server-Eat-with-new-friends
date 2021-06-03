import express, { Router } from 'express';
import cheatRoleMiddleware from '../cheat/cheatRoleMiddleware';
import accountController from '../controller/accountController';
import customerController from '../controller/customerController';
import authCustomerMiddleware from '../middleware/authCustomerMiddleware';

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

router.post('/v1/customer/getbyid',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authCustomerMiddleware("getById"),
  customerController.getById
)
router.post('/v1/customer/getbyname',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authCustomerMiddleware("getByName"),
  customerController.getByName
)

router.get('/v1/customer',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authCustomerMiddleware("getAll"),
  customerController.getAll
)

router.put('/v1/customer/createone',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authCustomerMiddleware("create"),
  uploadDisk.single("avatar"),
  customerController.createOne
)

router.delete('/v1/customer/delete',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authCustomerMiddleware("delete"),
  customerController.delete
)

router.put('/v1/customer/update',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authCustomerMiddleware("update"),
  uploadDisk.single("avatar"),
  customerController.updateInfo
)


export default router;