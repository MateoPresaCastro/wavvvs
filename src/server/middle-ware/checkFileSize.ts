import { Request, Response, NextFunction } from 'express';
const MAX_FILE_SIZE_IN_BYTES = 104857600; // 100MB;

// middleware to check if the file size is not exceeded
const checkFileSize = (req: Request, res: Response, next: NextFunction) => {
  try {
    let fileSize: number = 0;
    if(req.headers['content-length']) {
      fileSize = +req.headers['content-length'];
    }
    // console.log({ fileSize });
    if (fileSize > MAX_FILE_SIZE_IN_BYTES) {
      throw new Error('File size exceeded');
    }
    next();
  } catch (error) {
    res.status(407).send({ error });
  }
};

export default checkFileSize;
