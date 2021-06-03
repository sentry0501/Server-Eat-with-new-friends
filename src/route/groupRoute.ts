import express, { Router } from 'express';
import cheatRoleMiddleware from '../cheat/cheatRoleMiddleware';
import accountController from '../controller/accountController';
import customerController from '../controller/customerController';
import groupController from '../controller/groupController';
// import authGroupMiddleware from '../middleware/authGroupMiddleware';
import authGroupMiddleware from "../middleware/authGroupMiddleware";

import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

// router.post('/v1/customer/getbyid',
//   accountController.authTokenAndPassRoleCodeToResLocals,
//   authCustomerMiddleware("getById"),
//   customerController.getById
// )
// router.post('/v1/customer/getbyname',
//   accountController.authTokenAndPassRoleCodeToResLocals,
//   authCustomerMiddleware("getByName"),
//   customerController.getByName
// )

// router.get('/v1/customer',
//   accountController.authTokenAndPassRoleCodeToResLocals,
//   authCustomerMiddleware("getAll"),
//   customerController.getAll
// )

// router.put('/v1/customer/createone',
//   // accountController.authTokenAndPassRoleCodeToResLocals,
//   // authCustomerMiddleware("create"),
//   uploadDisk.single("avatar"),
//   customerController.createOne
// )

// router.delete('/v1/customer/delete',
//   accountController.authTokenAndPassRoleCodeToResLocals,
//   authCustomerMiddleware("delete"),
//   customerController.delete
// )

// router.put('/v1/customer/update',
//   accountController.authTokenAndPassRoleCodeToResLocals,
//   authCustomerMiddleware("update"),
//   uploadDisk.single("avatar"),
//   customerController.updateInfo
// )

router.put('/v1/group/join',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authGroupMiddleware("join"),
  groupController.join
)

router.put('/v1/group/leave',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authGroupMiddleware("leave"),
  groupController.leave
)

router.post('/v1/group/getmembers',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authGroupMiddleware("members"),
  groupController.getMembers
)

router.post('/v1/group/getbycustomerid',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authGroupMiddleware("members"),
  groupController.getByCustomerId
)


export default router;