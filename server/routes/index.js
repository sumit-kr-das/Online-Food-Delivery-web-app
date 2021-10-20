import express from 'express';
const router = express.Router();
import { regiaterController } from '../controller';



router.get('/', regiaterController.register);


export default router;