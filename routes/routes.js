import express from "express"
import { showOperators, showBsById, getUserToken } from "../controllers/product.js"
import { authenticateJWT } from "../models/productModels.js"
import passport from "passport"
import multer from "multer"
const upload = multer()

const router = express.Router()

router.get('/operators', authenticateJWT, showOperators)
 
router.get('/bs/:id', authenticateJWT, showBsById)

// router.post('/login', showUserToken)

router.post('/token', upload.none(), getUserToken)

export default router