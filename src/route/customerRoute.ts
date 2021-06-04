import express, { Router } from 'express';
import cheatRoleMiddleware from '../cheat/cheatRoleMiddleware';
import accountController from '../controller/accountController';
import customerController from '../controller/customerController';
import authCustomerMiddleware from '../middleware/authCustomerMiddleware';
import { format } from 'util';

import uploadDisk from '../_base/file/uploadDisk';
import upload from '../_base/file/upload';
import bucket from '.././_base/file/firebase';
import { v4 as uuid } from "uuid";
import uploadImgController from '../controller/uploadImgController';
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
  upload.single("avatar"),
  uploadImgController.uploadImg,
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
  upload.single("avatar"),
  uploadImgController.uploadImg,
  customerController.updateInfo
)
router.post('/upload', upload.single('file'), (req, res) => {
  if(!req.file) {
      return res.status(400).send("Error: No files found")
  } 

  const newName = uuid()
  const blob = bucket.file(newName)
  
  const tokens = uuid()
  const blobWriter = blob.createWriteStream({
      metadata: {
          // contentType: req.file.mimetype
          contentType: req.file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: tokens,
          }
      }
  })
  
  blobWriter.on('error', (err) => {
      console.log(err)
  })
  
  blobWriter.on('finish', () => {
      
      const url = "https://firebasestorage.googleapis.com/v0/b/eat-with-friend.appspot.com/o/"+ newName + "?alt=media&token=" + tokens;
      
      res.status(200).send(url)
  })  
  blobWriter.end(req.file.buffer)
})


export default router;