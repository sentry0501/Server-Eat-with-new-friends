import express, { Router } from 'express';
import accountController from '../controller/accountController';
import messageController from '../controller/messageController';
import authCustomerMiddleware from "../middleware/authCustomerMiddleware";


const router: Router = express.Router();


router.put('/v1/message/create',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authCustomerMiddleware("update"),
  messageController.createOne
)

router.post('/v1/message/getbygroupid',
  messageController.getByGroupId
)

export default router;