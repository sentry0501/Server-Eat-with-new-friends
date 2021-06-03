import express, { Router } from 'express';
import cheatRoleMiddleware from '../cheat/cheatRoleMiddleware';
import accountController from '../controller/accountController';
import customerController from '../controller/customerController';
import reviewController from '../controller/reviewController';
// import authGroupMiddleware from '../middleware/authGroupMiddleware';
import authCustomerMiddleware from "../middleware/authCustomerMiddleware";

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();


router.put('/v1/review/create',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authCustomerMiddleware("update"),
  reviewController.createOne
)

router.post('/v1/review/getbyrestaurantid',

  reviewController.getByRestaurantId
)

export default router;