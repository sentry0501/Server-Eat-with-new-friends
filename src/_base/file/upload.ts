import multer, { memoryStorage } from "multer"
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const upload = multer({
  storage: multer.memoryStorage()
})

export default upload