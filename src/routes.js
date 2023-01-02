import { Router } from 'express';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import UploadConfig from '../config/upload';
import multer from 'multer';

const routes = new Router();
const upload = multer(UploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/houses', upload.single('thumbnail') ,HouseController.store);

routes.get('/houses', HouseController.index);

routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);


export default routes;