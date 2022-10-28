import express from "express";
import { showOperators, showBsById, showUserToken } from "../controllers/product.js";
 
const router = express.Router();

router.get('/operators', showOperators);
 
router.get('/bs/:id', showBsById);

router.post('/login', showUserToken);

export default router;