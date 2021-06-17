import ERR_CODE from "../const/error";
import STATUS_CODE from "../const/status";
import sendResAppJson from "../dto/response/sendResAppJson";
import CustomError from "../error/customError";
import logger from "../_base/log/logger4js";
import accountService from "../service/accountService";
import upload from '../_base/file/upload';
import bucket from '../_base/file/firebase';
import { v4 as uuid } from "uuid";
import AbstractController from "./abstractController";

class UploadImgController extends AbstractController {
  private static _instance: UploadImgController
  private constructor() {
    super()
  }
  public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  public async uploadImg(req: any, res: any, next: any) {
    try {
      if(!req.file) {
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.UPLOAD_AVA_TO_FIREBASE_ERROR);
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
      const clock = setTimeout(function(){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.REQUEST_TIME_OUT)
      }, 10000)
      blobWriter.on('error', (err) => {
          clearTimeout(clock)
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.UPLOAD_AVA_TO_FIREBASE_ERROR);
      })
      // let url = new String;
      blobWriter.on('finish', () => {
          
          const url = newName + "?alt=media&token=" + tokens; 
          res.locals.url = url
          // logger.debug("URRLLLLL "+res.locals.url)
          clearTimeout(clock)
          next(); 
      })       
      blobWriter.end(req.file.buffer)


    }
    catch (e) {
      next(e);
    }
  }

  public async uploadResImg(req: any, res: any, next: any) {
    try {
      if(!req.files.avatar[0] || !req.files.cover[0]){
        throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.RESTAURANT_UPLOAD_AVA_ERROR);
      }
      const newName = uuid()
      const blob = bucket.file(newName)
      const tokens = uuid()
      const blobWriter = blob.createWriteStream({
          metadata: {
              // contentType: req.file.mimetype
              contentType: req.files.avatar[0].mimetype,
              metadata: {
                firebaseStorageDownloadTokens: tokens,
              }
          }
      })
      blobWriter.on('error', (err) => {
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.UPLOAD_AVA_TO_FIREBASE_ERROR);
      })
      // let url = new String;
      blobWriter.on('finish', () => {
          
          const url = newName + "?alt=media&token=" + tokens; 
      })       
      blobWriter.end(req.files.avatar[0].buffer)

      const newCover = uuid()
      const blobCover = bucket.file(newCover)
      const tokenCovers = uuid()
      const blobWriterCover = blobCover.createWriteStream({
          metadata: {
              // contentType: req.file.mimetype
              contentType: req.files.cover[0].mimetype,
              metadata: {
                firebaseStorageDownloadTokens: tokenCovers,
              }
          }
      })
      blobWriterCover.on('error', (err) => {
          throw new CustomError(STATUS_CODE.BAD_REQUEST, ERR_CODE.UPLOAD_AVA_TO_FIREBASE_ERROR);
      })
      // let url = new String;
      blobWriterCover.on('finish', () => {
        
      })       
      blobWriterCover.end(req.files.cover[0].buffer)

      res.locals.avatar =  newName + "?alt=media&token=" + tokens; 
      res.locals.cover =  newCover + "?alt=media&token=" + tokenCovers; 
      logger.debug("URRLLLLL "+res.locals.avatar)
      logger.debug("URRLLLLL "+res.locals.cover)
      next(); 
    }
    catch (e) {
      next(e);
    }
  }


}

export default UploadImgController.Instance