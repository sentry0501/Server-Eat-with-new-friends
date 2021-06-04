import express, { Router } from 'express';
import cheatRoleMiddleware from '../cheat/cheatRoleMiddleware';
import accountController from '../controller/accountController';
import customerController from '../controller/customerController';
import authCustomerMiddleware from '../middleware/authCustomerMiddleware';

import uploadDisk from '../_base/file/uploadDisk';
import upload from '../_base/file/upload';
import bucket from '.././_base/file/firebase';

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
router.post('/upload', upload.single('file'), (req, res) => {
  if(!req.file) {
      return res.status(400).send("Error: No files found")
  } 

  const blob = bucket.file(req.file.originalname)
  
  const blobWriter = blob.createWriteStream({
      metadata: {
          contentType: req.file.mimetype
      }
  })
  
  blobWriter.on('error', (err) => {
      console.log(err)
  })
  
  blobWriter.on('finish', () => {
      res.status(200).send("File uploaded.")
  })
  
  blobWriter.end(req.file.buffer)
})



export default router;