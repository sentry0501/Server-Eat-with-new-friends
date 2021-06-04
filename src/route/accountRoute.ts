import express, { Router } from 'express';
import accountController from '../controller/accountController';
import uploadDisk from '../_base/file/uploadDisk';

const router: Router = express.Router();

router.post('/v1/account/signin',
  uploadDisk.none(),
  accountController.signIn
);
router.post('/v1/accountRestaurant/signin',
  uploadDisk.none(),
  accountController.restaurantSignIn
);
router.put('/v1/account/changepw',
  uploadDisk.none(),
  accountController.changepass
);
router.put('/v1/account/changepwres',
  uploadDisk.none(),
  accountController.changepassRes
);

// router.post('/v1/account/signout',
//   accountController.signOut
// );

export default router;