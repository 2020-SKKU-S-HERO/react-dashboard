import express from 'express';
import { emissionRouter } from './api/emission-route';

const router: express.Router = express.Router();
export { router as apiRouter };

router.use('/emission', emissionRouter);