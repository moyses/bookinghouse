import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controller/SessionController';
import HouseController from './controller/HouseController';
import DashboardController from './controller/DashboardController';
import BookingController from './controller/BookingController';

const routes = new Router;
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
 
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/booking', BookingController.store);
routes.get('/bookings', BookingController.index);
routes.delete('/booking/cancel', BookingController.destroy);

export default routes;