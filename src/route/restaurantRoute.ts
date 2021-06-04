import express, { Router } from 'express';
import cheatRoleMiddleware from '../cheat/cheatRoleMiddleware';
import accountController from '../controller/accountController';
import restaurantController from '../controller/restaurantController';
import authRestaurantMiddleware from '../middleware/authRestaurantMiddleware';

import uploadDisk from '../_base/file/uploadDisk';
import uploadImgController from '../controller/uploadImgController';
import upload from '../_base/file/upload';

const router: Router = express.Router();

router.post('/v1/restaurant/getbyid',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authRestaurantMiddleware("getById"),
  restaurantController.getById
)

router.get('/v1/restaurant',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authRestaurantMiddleware("getAll"),
  restaurantController.getAll
)

router.post('/v1/restaurant/getbyname',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authRestaurantMiddleware("getByName"),
  restaurantController.getByName
)

router.put('/v1/restaurant/createone',
  // accountController.authTokenAndPassRoleCodeToResLocals,
  // authRestaurantMiddleware("create"),
  upload.fields(
    [{
      name: 'avatar', maxCount: 1
    }, {
      name: 'cover', maxCount: 1
    }]
  ),
  uploadImgController.uploadResImg,
  restaurantController.createOne
)

router.delete('/v1/restaurant/delete',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authRestaurantMiddleware("delete"),
  restaurantController.delete
)

router.put('/v1/restaurant/update',
  accountController.authTokenAndPassRoleCodeToResLocals,
  authRestaurantMiddleware("update"),
  upload.fields(
    [{
      name: 'avatar', maxCount: 1
    }, {
      name: 'cover', maxCount: 1
    }]
  ),
  uploadImgController.uploadResImg,
  restaurantController.updateInfo
)


export default router;