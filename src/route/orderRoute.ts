import express, { Router } from 'express';
import accountController from '../controller/accountController';
import orderController from '../controller/orderController';
import authOrderMiddleware from '../middleware/authOrderMiddleware';

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

router.post('/v1/order/getbygroupid',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("getById"),
  orderController.getByGroupId
)

router.post('/v1/order/getbyrestaurantid',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("getByRestaurantId"),
  orderController.getByRestaurantId
)


router.put('/v1/order/createone',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("create"),
  orderController.createOne
)


router.put('/v1/order/update',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authOrderMiddleware("update"),
  orderController.updateInfo
)



export default router;