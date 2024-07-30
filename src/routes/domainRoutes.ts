import express from 'express';
import { addDomain, getDomain } from '../controllers/domainController';

const router = express.Router();

router.post('/', addDomain);
router.get('/:name', getDomain);

export default router;
