import { Router } from 'express';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';
import UploadConfig from '../config/upload';
import multer from 'multer';

const routes = new Router();
const upload = multer(UploadConfig);

//User
routes.post('/sessions', SessionController.store);

//House
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

//Dashboard
routes.get('/dashboard', DashboardController.show);

//Reserve
routes.post('/houses/:house_id/reserve', ReserveController.store);
export default routes;