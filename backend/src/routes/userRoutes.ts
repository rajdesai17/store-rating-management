import { Router } from 'express';
import {
  getStores,
  createRating,
  updateRating,
  getProfile,
  getUserRating,
} from '../controllers/userController';
import {
  validateCreateRating,
  validateUpdateRating,
  validateUUID,
} from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All user routes require authentication
router.use(authenticateToken);

router.get('/stores', getStores);
router.post('/ratings', validateCreateRating, createRating);
router.put('/ratings/:id', validateUUID, validateUpdateRating, updateRating);
router.get('/user/profile', getProfile);
router.get('/ratings/:storeId', validateUUID, getUserRating);

export default router;