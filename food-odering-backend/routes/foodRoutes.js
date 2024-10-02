import express from 'express';
import { getFoods, addFood, deleteFood } from '../controllers/foodController.js';

const router = express.Router();

// Routes for listing, adding, and deleting food
router.get('/foods', getFoods);
router.post('/foods', addFood);
router.delete('/foods/:id', deleteFood);

export default router;
